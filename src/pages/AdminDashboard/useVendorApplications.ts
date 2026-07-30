import { useEffect, useState } from "react";
import { getPendingVendors, approveVendor, rejectVendor } from "../../api/admin-vendors";
import { useToast } from "../../components/Toast/ToastContext";

export function useVendorApplications() {
  const { showToast } = useToast();
  const token = localStorage.getItem("access_token") || "";
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = () => {
    setIsLoading(true);
    getPendingVendors()
      .then(setApplications)
      .catch(() => setApplications([]))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await approveVendor(token, id);
      showToast("Sotuvchi tasdiqlandi", "success");
      load();
    } catch (err: any) {
      showToast(err.message);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectVendor(token, id);
      showToast("Ariza rad etildi", "success");
      load();
    } catch (err: any) {
      showToast(err.message);
    }
  };

  return { applications, isLoading, handleApprove, handleReject };
}
