import { Link } from "react-router-dom";
import "./LowStockList.css";

const LowStockList = ({ products }: { products: any[] }) => {
  return (
    <div className="dashboard-card">
      <h3>Low Stock (≤ 5 left)</h3>

      {products.length === 0 && <p className="dashboard-empty">Everything is well stocked</p>}

      {products.length > 0 && (
        <div className="low-stock-list">
          {products.map((p) => (
            <Link to={`/product/${p.id}`} key={p.id} className="low-stock-item">
              <img src={p.main_image} alt={p.name} loading="lazy" decoding="async" />
              <span className="low-stock-name">{p.name}</span>
              <span className="low-stock-qty">{p.stock_qty} left</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LowStockList;
