import { useEffect, useState } from "react";
import { getAllVendors } from "../../api/admin-vendors";

export function useVendorsList(refreshKey: number) {
  const [vendors, setVendors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllVendors()
      .then(setVendors)
      .catch(() => setVendors([]))
      .finally(() => setIsLoading(false));
  }, [refreshKey]);

  return { vendors, isLoading };
}
