import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { getWishlist, toggleWishlist as apiToggle } from "../api/wishlist";

interface WishlistContextValue {
  items: any[];
  ids: Set<string>;
  isLoading: boolean;
  refreshWishlist: () => void;
  toggleWishlist: (productId: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<any[]>([]);
  const [ids, setIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const refreshWishlist = useCallback(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    setIsLoading(true);
    getWishlist(token)
      .then((res) => {
        const list = res?.data?.items || [];
        setItems(list);
        setIds(new Set(list.map((i: any) => i.product_id)));
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const toggleWishlist = async (productId: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("Avval tizimga kiring");
    await apiToggle(token, productId);
    refreshWishlist();
  };

  return (
    <WishlistContext.Provider value={{ items, ids, isLoading, refreshWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist faqat WishlistProvider ichida ishlaydi");
  return ctx;
};
