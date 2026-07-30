import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { getCompare, addToCompare, removeFromCompare } from "../api/compare";

interface CompareContextValue {
  items: any[];
  ids: Set<string>;
  isLoading: boolean;
  refreshCompare: () => void;
  toggleCompare: (productId: string) => Promise<void>;
}

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<any[]>([]);
  const [ids, setIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const refreshCompare = useCallback(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    getCompare(token)
      .then((res) => {
        const list = res?.data?.items || [];
        setItems(list);
        setIds(new Set(list.map((i: any) => i.product_id)));
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const toggleCompare = async (productId: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("Avval tizimga kiring");

    if (ids.has(productId)) {
      await removeFromCompare(token, productId);
    } else {
      if (ids.size >= 4) throw new Error("Maksimal 4 ta mahsulot solishtirish mumkin");
      await addToCompare(token, productId);
    }
    refreshCompare();
  };

  return (
    <CompareContext.Provider value={{ items, ids, isLoading, refreshCompare, toggleCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare faqat CompareProvider ichida ishlaydi");
  return ctx;
};
