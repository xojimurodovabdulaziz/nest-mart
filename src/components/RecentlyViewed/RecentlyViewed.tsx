import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecentlyViewed, type RecentlyViewedItem } from "../../hooks/useRecentlyViewed";
import { useLanguage } from "../../context/LanguageContext";
import "./RecentlyViewed.css";

const RecentlyViewed = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    setItems(getRecentlyViewed());
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="recently-viewed-section">
      <div className="container">
        <h2 className="recently-viewed-title">{t("recently_viewed_title")}</h2>
        <div className="recently-viewed-row">
          {items.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} className="recently-viewed-card">
              <img src={item.main_image} alt={item.name} loading="lazy" decoding="async" />
              <p className="recently-viewed-name">{item.name}</p>
              <span className="recently-viewed-price">${item.price}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
