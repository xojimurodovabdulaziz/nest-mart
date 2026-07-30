import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./CartItem.css";

interface CartItemProps {
  item: {
    id: string;
    product_id: string;
    quantity: number;
    price_at_add: number;
    product: { name: string; main_image: string };
  };
  onRemove: (productId: string) => void;
}

const CartItem = ({ item, onRemove }: CartItemProps) => {
  const { addToCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const lineTotal = (item.price_at_add * item.quantity).toFixed(2);

  const handleIncrement = () => {
    if (isUpdating) return;
    setIsUpdating(true);
    addToCart(item.product_id, item.quantity + 1).finally(() => setIsUpdating(false));
  };

  const handleDecrement = () => {
    if (isUpdating) return;
    if (item.quantity <= 1) {
      handleRemove();
      return;
    }
    setIsUpdating(true);
    addToCart(item.product_id, item.quantity - 1).finally(() => setIsUpdating(false));
  };

  const handleRemove = () => {
    setIsRemoving(true);
    // Small delay lets the exit animation play before the item leaves the list.
    setTimeout(() => onRemove(item.product_id), 180);
  };

  return (
    <div className={`cart-item ${isRemoving ? "cart-item-removing" : ""}`}>
      <Link to={`/product/${item.product_id}`} className="cart-item-image-link">
        <img
          src={item.product.main_image}
          alt={item.product.name}
          className="cart-item-image"
          loading="lazy"
          decoding="async"
        />
      </Link>

      <div className="cart-item-info">
        <Link to={`/product/${item.product_id}`} className="cart-item-name">
          {item.product.name}
        </Link>
        <p className="cart-item-unit-price">${item.price_at_add} / dona</p>

        <div className="cart-item-mobile-row">
          <div className="cart-item-qty-stepper">
            <button type="button" onClick={handleDecrement} disabled={isUpdating} aria-label="Kamaytirish">
              <Minus size={14} />
            </button>
            <span>{item.quantity}</span>
            <button type="button" onClick={handleIncrement} disabled={isUpdating} aria-label="Qo'shish">
              <Plus size={14} />
            </button>
          </div>
          <div className="cart-item-total">${lineTotal}</div>
        </div>
      </div>

      <div className="cart-item-qty-stepper cart-item-qty-desktop">
        <button type="button" onClick={handleDecrement} disabled={isUpdating} aria-label="Kamaytirish">
          <Minus size={14} />
        </button>
        <span>{item.quantity}</span>
        <button type="button" onClick={handleIncrement} disabled={isUpdating} aria-label="Qo'shish">
          <Plus size={14} />
        </button>
      </div>

      <div className="cart-item-total cart-item-total-desktop">${lineTotal}</div>

      <button
        type="button"
        className="cart-item-remove"
        onClick={handleRemove}
        aria-label="Mahsulotni o'chirish"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default CartItem;
