import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Users, LayoutGrid } from "lucide-react";
import Layout from "../../components/Layout/Layout";
import { useDashboardStats } from "./useDashboardStats";
import DashboardStats from "./DashboardStats";
import CategoryBreakdown from "./CategoryBreakdown";
import LowStockList from "./LowStockList";
import VendorApplications from "./VendorApplications";
import VendorsList from "./VendorsList";
import AddVendorModal from "./AddVendorModal";
import { isAdminRole, isVendorRole } from "../../utils/role";
import "./AdminDashboard.css";
import usePageTitle from "../../hooks/usePageTitle";

type Tab = "overview" | "vendors";

const AdminDashboard = () => {
  usePageTitle("Admin panel");
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("user_role");
  const stats = useDashboardStats();
  const [tab, setTab] = useState<Tab>("overview");
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [vendorsRefreshKey, setVendorsRefreshKey] = useState(0);

  if (!token) {
    return <p className="dashboard-status">Avval tizimga kiring</p>;
  }

  const isKnownNonAdmin = !isAdminRole(role) && (role === "user" || isVendorRole(role));
  if (isKnownNonAdmin) {
    return (
      <Layout>
        <div className="container">
          <p className="dashboard-status">
            Bu sahifa faqat admin uchun mo'ljallangan. Admin huquqini so'rash uchun{" "}
            <Link to="/contact">biz bilan bog'laning</Link>.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container admin-dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p className="dashboard-subtitle">Real-time overview from your product catalog</p>
          </div>
          <div className="dashboard-header-actions">
            <Link to="/vendor-panel" className="dashboard-manage-btn">
              Manage Products
            </Link>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button
            type="button"
            className={`dashboard-tab-btn ${tab === "overview" ? "active" : ""}`}
            onClick={() => setTab("overview")}
          >
            <LayoutGrid size={16} /> Statistika
          </button>
          <button
            type="button"
            className={`dashboard-tab-btn ${tab === "vendors" ? "active" : ""}`}
            onClick={() => setTab("vendors")}
          >
            <Users size={16} /> Sotuvchilar ro'yxati
          </button>
          <button
            type="button"
            className="dashboard-tab-btn dashboard-tab-btn-accent"
            onClick={() => setShowAddVendor(true)}
          >
            <UserPlus size={16} /> Sotuvchi qo'shish
          </button>
        </div>

        <p className="dashboard-note">
          Savdo/buyurtma (orders) statistikasi hozircha ko'rsatilmayapti, chunki API'da
          buyurtmalar endpoint'i mavjud emas. Quyidagi raqamlar mahsulotlar katalogidan
          hisoblangan haqiqiy ma'lumotlar.
        </p>

        {stats.isLoading && <p className="dashboard-status">Yuklanmoqda...</p>}

        {!stats.isLoading && tab === "overview" && (
          <>
            <DashboardStats
              totalProducts={stats.totalProducts}
              outOfStockCount={stats.outOfStockCount}
              inventoryValue={stats.inventoryValue}
              vendorsCount={stats.vendorsCount}
            />

            <div className="dashboard-grid">
              <CategoryBreakdown data={stats.categoryBreakdown} />
              <LowStockList products={stats.lowStock} />
              <VendorApplications />
            </div>
          </>
        )}

        {!stats.isLoading && tab === "vendors" && (
          <div className="dashboard-grid">
            <VendorsList refreshKey={vendorsRefreshKey} />
          </div>
        )}
      </div>

      {showAddVendor && (
        <AddVendorModal
          onClose={() => setShowAddVendor(false)}
          onCreated={() => setVendorsRefreshKey((k) => k + 1)}
        />
      )}
    </Layout>
  );
};

export default AdminDashboard;
