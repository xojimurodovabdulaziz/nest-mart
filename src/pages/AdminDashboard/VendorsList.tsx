import { useVendorsList } from "./useVendorsList";
import "./VendorsList.css";

const STATUS_LABEL: Record<string, string> = {
  approved: "Tasdiqlangan",
  pending: "Kutilmoqda",
  rejected: "Rad etilgan",
};

const VendorsList = ({ refreshKey }: { refreshKey: number }) => {
  const { vendors, isLoading } = useVendorsList(refreshKey);

  return (
    <div className="dashboard-card vendors-list">
      <h3>Sotuvchilar ro'yxati</h3>

      {isLoading && <p className="dashboard-empty">Yuklanmoqda...</p>}
      {!isLoading && vendors.length === 0 && (
        <p className="dashboard-empty">Hozircha sotuvchilar yo'q</p>
      )}

      {!isLoading &&
        vendors.map((v: any) => (
          <div className="vendor-row" key={v.id}>
            {v.logo ? (
              <img src={v.logo} alt={v.store_name} className="vendor-row-logo" loading="lazy" decoding="async" />
            ) : (
              <div className="vendor-row-logo vendor-row-logo-placeholder">
                {v.store_name?.[0]?.toUpperCase() || "?"}
              </div>
            )}
            <div className="vendor-row-info">
              <p className="vendor-row-name">{v.store_name}</p>
              <p className="vendor-row-owner">
                {v.owner_name} — {v.email}
              </p>
            </div>
            <span className={`vendor-status-badge status-${v.status}`}>
              {STATUS_LABEL[v.status] || v.status}
            </span>
          </div>
        ))}
    </div>
  );
};

export default VendorsList;
