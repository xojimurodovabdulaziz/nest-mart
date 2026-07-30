import { Package, AlertTriangle, Wallet, XCircle } from "lucide-react";
import "./VendorStats.css";

interface Props {
  products: any[];
}

const LOW_STOCK_THRESHOLD = 5;

const VendorStats = ({ products }: Props) => {
  const totalProducts = products.length;
  const outOfStock = products.filter((p) => !p.in_stock).length;
  const lowStock = products.filter(
    (p) => p.in_stock && p.stock_qty > 0 && p.stock_qty <= LOW_STOCK_THRESHOLD
  );
  const inventoryValue = products.reduce(
    (sum, p) => sum + Number(p.price || 0) * Number(p.stock_qty || 0),
    0
  );

  return (
    <div className="vendor-stats">
      <div className="vendor-stats-cards">
        <div className="vendor-stat-card">
          <div className="vendor-stat-icon vendor-stat-icon-blue">
            <Package size={18} />
          </div>
          <div>
            <p className="vendor-stat-number">{totalProducts}</p>
            <p className="vendor-stat-label">Jami mahsulotlar</p>
          </div>
        </div>

        <div className="vendor-stat-card">
          <div className="vendor-stat-icon vendor-stat-icon-orange">
            <AlertTriangle size={18} />
          </div>
          <div>
            <p className="vendor-stat-number">{lowStock.length}</p>
            <p className="vendor-stat-label">Kam qolgan (≤{LOW_STOCK_THRESHOLD} dona)</p>
          </div>
        </div>

        <div className="vendor-stat-card">
          <div className="vendor-stat-icon vendor-stat-icon-red">
            <XCircle size={18} />
          </div>
          <div>
            <p className="vendor-stat-number">{outOfStock}</p>
            <p className="vendor-stat-label">Omborda yo'q</p>
          </div>
        </div>

        <div className="vendor-stat-card">
          <div className="vendor-stat-icon vendor-stat-icon-green">
            <Wallet size={18} />
          </div>
          <div>
            <p className="vendor-stat-number">
              ${inventoryValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
            <p className="vendor-stat-label">Ombordagi mahsulotlar qiymati</p>
          </div>
        </div>
      </div>

      <p className="vendor-stats-note">
        Savdo, foyda va kunlik/haftalik/oylik/yillik hisobotlar hozircha ko'rsatilmaydi —
        backend'da buyurtma (order) ma'lumotlari mavjud emas. Bu funksiya uchun backend
        tomonda tegishli endpoint qo'shilishi kerak.
      </p>

      {lowStock.length > 0 && (
        <div className="vendor-reorder-list">
          <h3>Buyurtma berish kerak</h3>
          {lowStock.map((p) => (
            <div className="vendor-reorder-row" key={p.id}>
              <span className="vendor-reorder-name">{p.name}</span>
              <span className="vendor-reorder-qty">Qoldi: {p.stock_qty} dona</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorStats;
