import { Package, PackageX, DollarSign, Store } from "lucide-react";
import "./DashboardStats.css";

interface Props {
  totalProducts: number;
  outOfStockCount: number;
  inventoryValue: number;
  vendorsCount: number;
}

const DashboardStats = ({ totalProducts, outOfStockCount, inventoryValue, vendorsCount }: Props) => {
  const cards = [
    { icon: Package, label: "Total Products", value: totalProducts, color: "#2e7d32" },
    { icon: PackageX, label: "Out of Stock", value: outOfStockCount, color: "#e05252" },
    {
      icon: DollarSign,
      label: "Inventory Value",
      value: `$${inventoryValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      color: "#2e7d32",
    },
    { icon: Store, label: "Vendors", value: vendorsCount, color: "#4a9df0" },
  ];

  return (
    <div className="dashboard-stats">
      {cards.map((c) => (
        <div className="dashboard-stat-card" key={c.label}>
          <div className="dashboard-stat-icon" style={{ background: `${c.color}1a`, color: c.color }}>
            <c.icon size={20} />
          </div>
          <div>
            <p className="dashboard-stat-value">{c.value}</p>
            <p className="dashboard-stat-label">{c.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
