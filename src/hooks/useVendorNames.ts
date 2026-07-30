import { useEffect, useState } from "react";
import { getVendorsList } from "../api/vendors";

export function useVendorNames() {
  const [vendorMap, setVendorMap] = useState<Record<string, string>>({});

  useEffect(() => {
    getVendorsList()
      .then((res) => {
        const list = res?.data?.vendors || [];
        const map: Record<string, string> = {};
        list.forEach((v: any) => (map[v.id] = v.store_name));
        setVendorMap(map);
      })
      .catch(() => setVendorMap({}));
  }, []);

  const getVendorName = (vendorId: string | null) =>
    (vendorId && vendorMap[vendorId]) || "Nest Mart";

  return { getVendorName };
}
