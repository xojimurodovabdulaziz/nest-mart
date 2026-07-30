import { useEffect, useState } from "react";

export type StaffRole = "Admin" | "Sotuvchi" | "Kassir" | "Dostavchik";

export interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
}

export const STAFF_ROLES: StaffRole[] = ["Admin", "Sotuvchi", "Kassir", "Dostavchik"];

function storageKey(vendorId: string) {
  return `shop_staff_${vendorId}`;
}

export function useShopStaff(vendorId: string | null) {
  const [staff, setStaff] = useState<StaffMember[]>([]);

  useEffect(() => {
    if (!vendorId) {
      setStaff([]);
      return;
    }
    try {
      const raw = localStorage.getItem(storageKey(vendorId));
      setStaff(raw ? JSON.parse(raw) : []);
    } catch {
      setStaff([]);
    }
  }, [vendorId]);

  const addStaff = (name: string, role: StaffRole) => {
    if (!vendorId) return;
    const next = [...staff, { id: `${Date.now()}`, name, role }];
    setStaff(next);
    localStorage.setItem(storageKey(vendorId), JSON.stringify(next));
  };

  const removeStaff = (id: string) => {
    if (!vendorId) return;
    const next = staff.filter((s) => s.id !== id);
    setStaff(next);
    localStorage.setItem(storageKey(vendorId), JSON.stringify(next));
  };

  return { staff, addStaff, removeStaff };
}
