import { Link, useLocation } from "react-router-dom";
import { ShoppingBasket, ChevronRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./MiniCartBar.css";

const MiniCartBar = () => {
  const { count, total } = useCart();
  const { pathname } = useLocation();

  if (count === 0) return null;
  if (pathname.startsWith("/cart") || pathname.startsWith("/checkout")) return null;

  return (
    <Link to="/cart" className="mini-cart-bar">
      <span className="mini-cart-bar-icon">
        <ShoppingBasket size={18} />
        <span className="mini-cart-bar-count">{count}</span>
      </span>
      <span className="mini-cart-bar-label">Savat</span>
      <span className="mini-cart-bar-total">${total.toFixed(2)}</span>
      <ChevronRight size={18} />
    </Link>
  );
};

export default MiniCartBar;
