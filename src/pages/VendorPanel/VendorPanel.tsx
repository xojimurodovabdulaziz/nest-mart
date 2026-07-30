import { Link, Navigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useVendorAccess } from "./useVendorAccess";
import { useAdminProducts } from "./useAdminProducts";
import VendorAccessGate from "./VendorAccessGate";
import VendorProductForm from "./VendorProductForm";
import VendorProductsGrid from "./VendorProductsGrid";
import VendorStats from "./VendorStats";
import "./VendorPanel.css";
import "./VendorPanelHeader.css";
import usePageTitle from "../../hooks/usePageTitle";

const VendorPanel = () => {
  usePageTitle("Vendor panel");

  const token = localStorage.getItem("access_token");
  const access = useVendorAccess();
  const isAdmin = access === "admin";
  const isVendor = access === "approved-vendor";
  const vendorId = isVendor ? localStorage.getItem("vendor_id") : null;

  const {
    products,
    isLoading,
    editingProduct,
    setEditingProduct,
    isSending,
    handleSave,
    handleDelete,
  } = useAdminProducts(vendorId);

  if (!token) return <Navigate to="/login" replace />;
  if (access === "checking") {
    return <p className="vendor-panel-status">Tekshirilmoqda...</p>;
  }
  if (!isAdmin && !isVendor) {
    return (
      <Layout>
        <div className="container vendor-panel">
          <VendorAccessGate state={access} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container vendor-panel">
        <div className="vendor-panel-header">
          <h1>{isAdmin ? "Admin paneli" : "Sotuvchi paneli"}</h1>
          {isAdmin && (
            <Link to="/admin-dashboard" className="vendor-panel-dashboard-link">
              View Dashboard
            </Link>
          )}
        </div>

        {!isLoading && <VendorStats products={products} />}

        <VendorProductForm
          editingProduct={editingProduct}
          isSending={isSending}
          onSave={handleSave}
          onCancel={() => setEditingProduct(null)}
        />

        <h2>{isAdmin ? "Barcha mahsulotlar" : "Mening mahsulotlarim"}</h2>

        <VendorProductsGrid
          products={products}
          isLoading={isLoading}
          onEdit={setEditingProduct}
          onDelete={handleDelete}
        />
      </div>
    </Layout>
  );
};

export default VendorPanel;
