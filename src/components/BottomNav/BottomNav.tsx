import { Link, useLocation } from "react-router-dom";
import { Home, Grid2x2, Heart, ShoppingCart, User } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useProfileDrawer } from "../../context/ProfileDrawerContext";
import "./BottomNav.css";

const BottomNav = () => {
  const location = useLocation();
  const { ids } = useWishlist();
  const { count } = useCart();
  const { open } = useProfileDrawer();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`bottom-nav-item ${isActive("/") ? "active" : ""}`}>
        <Home size={22} />
        <span>Bosh sahifa</span>
      </Link>

      <Link to="/categories" className={`bottom-nav-item ${isActive("/categories") ? "active" : ""}`}>
        <Grid2x2 size={22} />
        <span>Kategoriyalar</span>
      </Link>

      <Link to="/wishlist" className={`bottom-nav-item ${isActive("/wishlist") ? "active" : ""}`}>
        <span className="bottom-nav-icon-wrap">
          <Heart size={22} />
          {ids.size > 0 && <span className="bottom-nav-badge">{ids.size}</span>}
        </span>
        <span>Sevimlilar</span>
      </Link>

      <Link to="/cart" className={`bottom-nav-item ${isActive("/cart") ? "active" : ""}`}>
        <span className="bottom-nav-icon-wrap">
          <ShoppingCart size={22} />
          {count > 0 && <span className="bottom-nav-badge">{count}</span>}
        </span>
        <span>Savat</span>
      </Link>

      <button type="button" className="bottom-nav-item bottom-nav-item-btn" onClick={open}>
        <User size={22} />
        <span>Profil</span>
      </button>
    </nav>
  );
};

export default BottomNav;
