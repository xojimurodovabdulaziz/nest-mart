import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/products";
import ProductColumnRow from "./ProductColumnRow";
import Reveal from "../Reveal/Reveal";
import { useLanguage } from "../../context/LanguageContext";
import "./ProductColumns.css";

const ProductColumns = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts({ page: 1, limit: 100 })
      .then((res) => setProducts(res?.data?.products || []))
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading && products.length === 0) return null;

  const byReviews = [...products].sort(
    (a, b) => (b.reviews_count || 0) - (a.reviews_count || 0)
  );
  const byDiscount = [...products].sort(
    (a, b) => (b.discount_percent || 0) - (a.discount_percent || 0)
  );
  const byNewest = [...products].sort(
    (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
  );
  const byRating = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const columns = [
    { title: t("col_top_selling"), items: byDiscount.slice(0, 3) },
    { title: t("col_trending"), items: byReviews.slice(0, 3) },
    { title: t("col_recently_added"), items: byNewest.slice(0, 3) },
    { title: t("col_top_rated"), items: byRating.slice(0, 3) },
  ];

  return (
    <section className="product-columns-section">
      <div className="container product-columns-grid">
        {isLoading
          ? Array.from({ length: 4 }).map((_, colIndex) => (
              <div className="product-column" key={colIndex}>
                <div className="product-column-header">
                  <div className="skeleton-block skeleton-line" style={{ width: "60%", height: 16 }} />
                </div>
                {Array.from({ length: 3 }).map((_, rowIndex) => (
                  <div className="product-column-row-skeleton" key={rowIndex}>
                    <div className="skeleton-block product-column-thumb-skeleton" />
                    <div className="product-column-info-skeleton">
                      <div className="skeleton-block skeleton-line skeleton-line-wide" />
                      <div className="skeleton-block skeleton-line" style={{ width: "40%" }} />
                    </div>
                  </div>
                ))}
              </div>
            ))
          : columns.map((col, colIndex) => (
              <Reveal key={col.title} delay={colIndex * 60}>
                <div className="product-column">
                  <div className="product-column-header">
                    <h3>{col.title}</h3>
                    <Link to="/">{t("see_all")}</Link>
                  </div>
                  {col.items.map((p) => (
                    <ProductColumnRow key={p.id} product={p} />
                  ))}
                </div>
              </Reveal>
            ))}
      </div>
    </section>
  );
};

export default ProductColumns;
