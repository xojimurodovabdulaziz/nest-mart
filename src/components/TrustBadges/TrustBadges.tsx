import { Tag, Truck, FileText, Grid3x3, PackageCheck } from "lucide-react";
import "./TrustBadges.css";

const BADGES = [
  { icon: Tag, title: "Best prices & offers", subtitle: "Orders $50 or more" },
  { icon: Truck, title: "Free delivery", subtitle: "24/7 amazing services" },
  { icon: FileText, title: "Great daily deal", subtitle: "When you sign up" },
  { icon: Grid3x3, title: "Wide assortment", subtitle: "Mega Discounts" },
  { icon: PackageCheck, title: "Easy returns", subtitle: "Within 30 days" },
];

const TrustBadges = () => {
  return (
    <section className="trust-badges">
      <div className="container trust-badges-grid">
        {BADGES.map((b) => (
          <div className="trust-badge-item" key={b.title}>
            <div className="trust-badge-icon">
              <b.icon size={20} />
            </div>
            <div>
              <p className="trust-badge-title">{b.title}</p>
              <p className="trust-badge-subtitle">{b.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;
