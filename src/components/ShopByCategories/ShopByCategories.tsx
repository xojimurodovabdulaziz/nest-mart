import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { getCategories } from "../../api/categories";
import { getProducts } from "../../api/products";
import { categoryIconMap } from "../Header/categoryIcons";
import { useLanguage } from "../../context/LanguageContext";
import "./ShopByCategories.css";

const ShopByCategories = () => {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res?.data?.categories || []))
      .catch(() => setCategories([]))
      .finally(() => setIsLoadingCategories(false));
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -220 : 220, behavior: "smooth" });
  };

  const handleToggle = (catId: string) => {
    const next = expandedId === catId ? null : catId;
    setExpandedId(next);

    if (next && allProducts.length === 0) {
      setIsLoadingProducts(true);
      getProducts({ page: 1, limit: 100 })
        .then((res) => setAllProducts(res?.data?.products || []))
        .catch(() => setAllProducts([]))
        .finally(() => setIsLoadingProducts(false));
    }
  };

  if (!isLoadingCategories && categories.length === 0) return null;

  const expandedProducts = expandedId
    ? allProducts.filter((p) => p.category_id === expandedId).slice(0, 8)
    : [];
  const expandedCategory = categories.find((c) => c.id === expandedId);

  return (
    <section className="shop-categories-section">
      <div className="container">
        <div className="shop-categories-header">
          <h2>{t("shop_by_categories_title")}</h2>
          <div className="shop-categories-controls">
            <Link to="/" className="shop-categories-all">
              {t("all_categories")} <ChevronRight size={16} />
            </Link>
            <button onClick={() => scroll("left")} aria-label="Scroll left">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="shop-categories-row" ref={scrollRef}>
          {isLoadingCategories
            ? Array.from({ length: 6 }).map((_, i) => (
                <div className="shop-category-item-skeleton" key={i}>
                  <div className="skeleton-block shop-category-skeleton-icon" />
                  <div className="skeleton-block skeleton-line" style={{ width: "70%" }} />
                </div>
              ))
            : categories.map((cat) => {
                const Icon = categoryIconMap[cat.slug] || Package;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    className={`shop-category-item ${expandedId === cat.id ? "active" : ""}`}
                    onClick={() => handleToggle(cat.id)}
                  >
                    <Icon size={28} />
                    <p>{cat.name}</p>
                    <span>{cat.products_count} items</span>
                  </button>
                );
              })}
        </div>

        {expandedId && (
          <div className="shop-category-expand">
            <div className="shop-category-expand-header">
              <h3>{expandedCategory?.name}</h3>
              <Link to={`/?category=${expandedCategory?.slug}`} className="shop-category-expand-all">
                Barchasini ko'rish <ChevronRight size={14} />
              </Link>
            </div>

            {isLoadingProducts && (
              <div className="shop-category-expand-grid">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div className="shop-category-expand-card-skeleton" key={i}>
                    <div className="skeleton-block shop-category-expand-skeleton-image" />
                    <div className="skeleton-block skeleton-line skeleton-line-wide" />
                  </div>
                ))}
              </div>
            )}

            {!isLoadingProducts && expandedProducts.length === 0 && (
              <p className="shop-category-expand-empty">Bu kategoriyada mahsulot topilmadi</p>
            )}

            {!isLoadingProducts && expandedProducts.length > 0 && (
              <div className="shop-category-expand-grid">
                {expandedProducts.map((p) => (
                  <Link to={`/product/${p.id}`} key={p.id} className="shop-category-expand-card">
                    <img src={p.main_image} alt={p.name} loading="lazy" decoding="async" />
                    <p>{p.name}</p>
                    <span>${p.price}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopByCategories;
