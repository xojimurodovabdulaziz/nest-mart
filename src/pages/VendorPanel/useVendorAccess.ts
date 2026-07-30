import { useEffect, useState } from "react";
import { getVendorsList } from "../../api/vendors";
import { isAdminRole, isVendorRole } from "../../utils/role";

export type VendorAccessState =
  | "checking"
  | "admin"
  | "approved-vendor"
  | "pending"
  | "rejected"
  | "not-applied";

export function useVendorAccess() {
  const [state, setState] = useState<VendorAccessState>("checking");
  const role = localStorage.getItem("user_role");
  const vendorId = localStorage.getItem("vendor_id");

  useEffect(() => {
    if (isAdminRole(role)) {
      setState("admin");
      return;
    }
    if (isVendorRole(role)) {
      setState("approved-vendor");
      return;
    }
    if (!vendorId) {
      setState("not-applied");
      return;
    }

    getVendorsList()
      .then((res) => {
        const vendors = res?.data?.vendors || [];
        const mine = vendors.find((v: any) => v.id === vendorId);
        if (!mine) {
          setState("not-applied");
        } else if (mine.status === "approved") {
          localStorage.setItem("user_role", "vendor");
          setState("approved-vendor");
        } else if (mine.status === "rejected") {
          setState("rejected");
        } else {
          setState("pending");
        }
      })
      .catch(() => setState("pending"));
  }, [role, vendorId]);

  return state;
}
