import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getProducts } from "../../api/products";
import { useVendorNames } from "../../hooks/useVendorNames";
import DealCard from "./DealCard";
import DealCardSkeleton from "./DealCardSkeleton";
import Reveal from "../Reveal/Reveal";
import { useLanguage } from "../../context/LanguageContext";
import "./DealsOfTheDay.css";

const DealsOfTheDay = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getVendorName } = useVendorNames();

  useEffect(() => {
    getProducts({ page: 1, limit: 30 })
      .then((res) => {
        const all = res?.data?.products || [];
        setProducts(all.filter((p: any) => p.discount_percent > 0).slice(0, 4));
      })
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="deals-section">
      <div className="container">
        <div className="deals-header">
          <h2>{t("deals_title")}</h2>
          <Link to="/discounts" className="deals-see-all">
            {t("all_deals")} <ChevronRight size={16} />
          </Link>
        </div>

        <div className="deals-grid">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <DealCardSkeleton key={i} />)
            : products.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 60}>
                  <DealCard product={p} vendorName={getVendorName(p.vendor_id)} />
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay;
