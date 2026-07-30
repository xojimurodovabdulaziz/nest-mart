import { useVendorApplications } from "./useVendorApplications";
import "./VendorApplications.css";

const VendorApplications = () => {
  const { applications, isLoading, handleApprove, handleReject } = useVendorApplications();

  return (
    <div className="dashboard-card vendor-applications">
      <h3>Sotuvchi arizalari</h3>

      {isLoading && <p className="dashboard-empty">Yuklanmoqda...</p>}
      {!isLoading && applications.length === 0 && (
        <p className="dashboard-empty">Yangi arizalar yo'q</p>
      )}

      {applications.map((v) => (
        <div className="vendor-app-item" key={v.id}>
          <div>
            <p className="vendor-app-name">{v.store_name}</p>
            <p className="vendor-app-owner">{v.owner_name} — {v.email}</p>
          </div>
          <div className="vendor-app-actions">
            <button className="vendor-app-approve" onClick={() => handleApprove(v.id)}>
              Tasdiqlash
            </button>
            <button className="vendor-app-reject" onClick={() => handleReject(v.id)}>
              Rad etish
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VendorApplications;
