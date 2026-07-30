import { useEffect, useRef, useState, useCallback } from "react";
import ProductCard from "../ProductCard/ProductCard";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";
import Reveal from "../Reveal/Reveal";
import { getProducts, searchProducts } from "../../api/products";
import SortControl from "./SortControl";
import "./ProductGrid.css";

interface Props {
  category?: string;
  categoryId?: string;
  vendorId?: string;
  tag?: string;
  searchQuery?: string;
  priceMin?: number;
  priceMax?: number;
  minRating?: number;
}

const PAGE_SIZE = 12;

const ProductGrid = ({
  category,
  categoryId,
  vendorId,
  tag,
  searchQuery,
  priceMin,
  priceMax,
  minRating,
}: Props) => {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);

  const isVendorView = Boolean(vendorId);
  const canLoadMore = !searchQuery && !isVendorView;

  // Filtrlar o'zgarganda birinchi sahifadan qayta yuklaymiz
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setPage(1);
    setHasMore(true);

    const request = searchQuery
      ? searchProducts(searchQuery)
      : getProducts({
          category,
          tag,
          sort: sort && sort !== "popular" ? sort : undefined,
          page: 1,
          limit: isVendorView ? 100 : PAGE_SIZE,
        });

    request
      .then((result) => {
        const list = result?.data?.products || [];
        setProducts(list);
        if (searchQuery || isVendorView || list.length < PAGE_SIZE) setHasMore(false);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [category, tag, searchQuery, sort, vendorId, isVendorView]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore || !canLoadMore) return;
    const nextPage = page + 1;
    setIsLoadingMore(true);
    getProducts({
      category,
      tag,
      sort: sort && sort !== "popular" ? sort : undefined,
      page: nextPage,
      limit: PAGE_SIZE,
    })
      .then((result) => {
        const list = result?.data?.products || [];
        setProducts((prev) => [...prev, ...list]);
        setPage(nextPage);
        if (list.length < PAGE_SIZE) setHasMore(false);
      })
      .catch(() => setHasMore(false))
      .finally(() => setIsLoadingMore(false));
  }, [category, tag, sort, page, hasMore, isLoadingMore, canLoadMore]);

  // Infinite scroll: pastki "sentinel" ko'rinishga kirganda keyingi sahifani yuklaymiz
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !canLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore, canLoadMore]);

  const visibleProducts = products
    .filter((p) => {
      if (categoryId && p.category_id !== categoryId) return false;
      if (vendorId && p.vendor_id !== vendorId) return false;
      const price = Number(p.price);
      if (priceMin !== undefined && price < priceMin) return false;
      if (priceMax !== undefined && price > priceMax) return false;
      if (minRating !== undefined && Number(p.rating || 0) < minRating) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "price") return Number(a.price) - Number(b.price);
      if (sort === "rating") return Number(b.rating || 0) - Number(a.rating || 0);
      if (sort === "popular") return Number(b.reviews_count || 0) - Number(a.reviews_count || 0);
      if (sort === "created_at") {
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      }
      return 0;
    });

  return (
    <div>
      {!searchQuery && (
        <div className="grid-toolbar">
          <SortControl value={sort} onChange={setSort} />
        </div>
      )}

      {isLoading && (
        <div className="product-grid" aria-busy="true" aria-label="Mahsulotlar yuklanmoqda">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}
      {error && <p className="grid-status grid-error">{error}</p>}
      {!isLoading && !error && visibleProducts.length === 0 && (
        <p className="grid-status">
          {products.length > 0
            ? "Ushbu filtr bo'yicha mahsulot topilmadi"
            : "No products found"}
        </p>
      )}

      {!isLoading && !error && visibleProducts.length > 0 && (
        <>
          <div className="product-grid">
            {visibleProducts.map((product, i) => (
              <Reveal key={product.id} delay={(i % 4) * 60}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          {canLoadMore && hasMore && (
            <div ref={sentinelRef} className="grid-load-sentinel">
              {isLoadingMore && (
                <div className="product-grid grid-load-more-skeletons">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;
