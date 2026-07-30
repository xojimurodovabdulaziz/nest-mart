import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import {
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from "../../api/admin-products";
import type { AdminProductPayload } from "../../api/admin-products";
import { useToast } from "../../components/Toast/ToastContext";

export function useAdminProducts(scopeVendorId?: string | null) {
  const { showToast } = useToast();
  const token = localStorage.getItem("access_token") || "";

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isSending, setIsSending] = useState(false);

  const loadProducts = () => {
    setIsLoading(true);
    getProducts({ page: 1, limit: 100 })
      .then((res) => {
        const all = res?.data?.products || [];
        setProducts(scopeVendorId ? all.filter((p: any) => p.vendor_id === scopeVendorId) : all);
      })
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, [scopeVendorId]);

  const handleSave = async (payload: AdminProductPayload) => {
    setIsSending(true);
    try {
      const finalPayload = scopeVendorId ? { ...payload, vendor_id: scopeVendorId } : payload;
      if (editingProduct) {
        await updateAdminProduct(token, editingProduct.id, finalPayload);
        showToast("Mahsulot yangilandi", "success");
      } else {
        await createAdminProduct(token, finalPayload);
        showToast("Mahsulot qo'shildi", "success");
      }
      setEditingProduct(null);
      loadProducts();
    } catch (err: any) {
      showToast(err.message);
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAdminProduct(token, id);
      showToast("Mahsulot o'chirildi", "success");
      loadProducts();
    } catch (err: any) {
      showToast(err.message);
    }
  };

  const inventoryValue = products.reduce(
    (sum, p) => sum + p.price * (p.stock_qty || 0),
    0
  );

  return {
    products,
    isLoading,
    editingProduct,
    setEditingProduct,
    isSending,
    handleSave,
    handleDelete,
    inventoryValue,
  };
}
