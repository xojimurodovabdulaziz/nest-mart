import { Link } from "react-router-dom";
import { isAdminRole, isVendorRole } from "../../utils/role";

const NavRoleLink = () => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("user_role");
  const vendorId = localStorage.getItem("vendor_id");

  const isAdmin = Boolean(token && isAdminRole(role));
  const isVendor = Boolean(token && (isVendorRole(role) || vendorId));

  return (
    <>
      {isAdmin && (
        <Link to="/admin-dashboard" className="nav-role-btn">
          Admin bo'limi
        </Link>
      )}
      <Link to={isVendor ? "/vendor-panel" : "/become-vendor"} className="nav-role-btn">
        Sotuvchi bo'limi
      </Link>
    </>
  );
};

export default NavRoleLink;
