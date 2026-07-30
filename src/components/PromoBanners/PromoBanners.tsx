import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./PromoBanners.css";

const BANNERS = [
  {
    title: "Everyday Fresh & Clean with Our Products",
    to: "/discounts",
    className: "promo-banner-cream",
  },
  {
    title: "Make your Breakfast Healthy and Easy",
    to: "/?category=milks-and-dairies",
    className: "promo-banner-pink",
  },
  {
    title: "The best Organic Products Online",
    to: "/?tag=Organic",
    className: "promo-banner-blue",
  },
];

const PromoBanners = () => {
  return (
    <section className="promo-section">
      <div className="container promo-grid">
        {BANNERS.map((b) => (
          <Link to={b.to} key={b.title} className={`promo-banner ${b.className}`}>
            <h3>{b.title}</h3>
            <span className="promo-shop-now">
              Shop Now <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PromoBanners;
