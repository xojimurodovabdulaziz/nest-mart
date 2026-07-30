import { Link } from "react-router-dom";
import { Repeat, Heart, ShoppingCart, User, Sun, Moon } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCompare } from "../../context/CompareContext";
import { useProfileDrawer } from "../../context/ProfileDrawerContext";
import { useTheme } from "../../context/ThemeContext";
import "./HeaderIcons.css";

const HeaderIcons = () => {
  const token = localStorage.getItem("access_token");
  const userName = localStorage.getItem("user_name");
  const { count: cartCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { ids: compareIds } = useCompare();
  const { open } = useProfileDrawer();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="header-icons">
      <button
        type="button"
        className="header-icon-item header-icon-item-btn"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "Yorug' rejim" : "Qorong'i rejim"}
      >
        <span className="icon-wrap">
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </span>
        <p>{theme === "dark" ? "Light" : "Dark"}</p>
      </button>

      <Link to="/compare" className="header-icon-item">
        <span className="icon-wrap">
          <Repeat size={20} />
          {compareIds.size > 0 && <span className="icon-badge">{compareIds.size}</span>}
        </span>
        <p>Compare</p>
      </Link>

      <Link to="/wishlist" className="header-icon-item">
        <span className="icon-wrap">
          <Heart size={20} />
          {wishlistItems.length > 0 && <span className="icon-badge">{wishlistItems.length}</span>}
        </span>
        <p>Wishlist</p>
      </Link>

      <Link to="/cart" className="header-icon-item">
        <span className="icon-wrap">
          <ShoppingCart size={20} />
          {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
        </span>
        <p>Cart</p>
      </Link>

      <button type="button" className="header-icon-item header-icon-item-btn" onClick={open}>
        <span className="icon-wrap">
          <User size={20} />
        </span>
        <p>{token ? userName || "Account" : "Account"}</p>
      </button>
    </div>
  );
};

export default HeaderIcons;
