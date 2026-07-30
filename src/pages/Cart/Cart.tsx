import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, ShieldCheck } from "lucide-react";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import CartItemSkeleton from "./CartItemSkeleton";
import Reveal from "../../components/Reveal/Reveal";
import "./Cart.css";
import usePageTitle from "../../hooks/usePageTitle";

const Cart = () => {
  usePageTitle("Savat");

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const { items, total, isLoading, refreshCart, removeFromCart } = useCart();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    refreshCart();
  }, [token, navigate, refreshCart]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (!token) return null;

  return (
    <Layout>
      <div className="container cart-page">
        <h1>Savat</h1>

        {isLoading && (
          <div className="cart-layout">
            <div className="cart-items">
              {Array.from({ length: 3 }).map((_, i) => (
                <CartItemSkeleton key={i} />
              ))}
            </div>
          </div>
        )}

        {!isLoading && items.length === 0 && (
          <div className="cart-empty">
            <div className="cart-empty-icon" aria-hidden="true">
              <ShoppingCart size={40} />
            </div>
            <p className="cart-empty-title">Savatingiz bo'sh</p>
            <p className="cart-empty-subtitle">Xarid qilishga tayyor mahsulotlarni shu yerga qo'shing.</p>
            <Link to="/" className="cart-empty-link">
              Xarid qilishni boshlash
            </Link>
          </div>
        )}

        {!isLoading && items.length > 0 && (
          <div className="cart-layout">
            <div className="cart-items">
              <p className="cart-items-count">{items.length} ta mahsulot</p>
              {items.map((item, i) => (
                <Reveal key={item.id} delay={(i % 4) * 60}>
                  <CartItem item={item} onRemove={removeFromCart} />
                </Reveal>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Umumiy summa</h3>
              <div className="cart-summary-row">
                <span>Mahsulotlar ({items.length})</span>
                <span className="cart-total">${total.toFixed(2)}</span>
              </div>
              <button className="cart-checkout-btn" onClick={handleCheckout}>
                Buyurtma berish
              </button>
              <p className="cart-secure-note">
                <ShieldCheck size={14} /> Xavfsiz va shifrlangan to'lov
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
