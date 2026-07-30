import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { getCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart } from "../api/cart";

interface CartContextValue {
  items: any[];
  total: number;
  count: number;
  isLoading: boolean;
  refreshCart: () => void;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const refreshCart = useCallback(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    setIsLoading(true);
    getCart(token)
      .then((res) => {
        setItems(res?.data?.items || []);
        setTotal(res?.data?.total || 0);
        setCount(res?.data?.count || 0);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const addToCart = async (productId: string, quantity = 1) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("Avval tizimga kiring");
    await apiAddToCart(token, productId, quantity);
    refreshCart();
  };

  const removeFromCart = async (productId: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    await apiRemoveFromCart(token, productId);
    refreshCart();
  };

  return (
    <CartContext.Provider
      value={{ items, total, count, isLoading, refreshCart, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart faqat CartProvider ichida ishlaydi");
  return ctx;
};
