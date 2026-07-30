import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import { getCategories } from "../../api/categories";
import { getVendorsList } from "../../api/vendors";

export function useDashboardStats() {
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [inStockCount, setInStockCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [inventoryValue, setInventoryValue] = useState(0);
  const [vendorsCount, setVendorsCount] = useState(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState<any[]>([]);
  const [lowStock, setLowStock] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      getProducts({ page: 1, limit: 100 }),
      getCategories(),
      getVendorsList().catch(() => ({ data: { vendors: [] } })),
    ])
      .then(([productsRes, categoriesRes, vendorsRes]) => {
        const products = productsRes?.data?.products || [];
        const categories = categoriesRes?.data?.categories || [];
        const vendors = vendorsRes?.data?.vendors || [];

        setTotalProducts(productsRes?.data?.pagination?.total ?? products.length);
        setInStockCount(products.filter((p: any) => p.in_stock).length);
        setOutOfStockCount(products.filter((p: any) => !p.in_stock).length);
        setInventoryValue(
          products.reduce((sum: number, p: any) => sum + p.price * (p.stock_qty || 0), 0)
        );
        setVendorsCount(vendors.length);

        const breakdown = categories.map((c: any) => ({
          name: c.name,
          count: products.filter((p: any) => p.category_id === c.id).length,
        }));
        setCategoryBreakdown(breakdown);

        setLowStock(products.filter((p: any) => p.in_stock && p.stock_qty <= 5));
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    totalProducts,
    inStockCount,
    outOfStockCount,
    inventoryValue,
    vendorsCount,
    categoryBreakdown,
    lowStock,
  };
}
