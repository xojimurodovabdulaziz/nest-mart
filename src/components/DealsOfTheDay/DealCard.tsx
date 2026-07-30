import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useToast } from "../Toast/ToastContext";
import "./DealCard.css";

interface Props {
  product: any;
  vendorName: string;
}

const DealCard = ({ product, vendorName }: Props) => {
  const { items, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const cartItem = items.find((item) => item.product_id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  // Only redirect for the case that's actually true: no session. Any
  // other failure gets a toast instead of silently leaving the page.
  const handleActionError = () => {
    if (!localStorage.getItem("access_token")) {
      showToast("Savatga qo'shish uchun avval tizimga kiring", "error");
      navigate("/login");
    } else {
      showToast("Xatolik yuz berdi, qayta urinib ko'ring", "error");
    }
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.id).catch(handleActionError);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isUpdating) return;
    setIsUpdating(true);
    addToCart(product.id, quantity + 1)
      .catch(handleActionError)
      .finally(() => setIsUpdating(false));
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isUpdating) return;
    setIsUpdating(true);
    const action =
      quantity <= 1 ? removeFromCart(product.id) : addToCart(product.id, quantity - 1);
    action.catch(handleActionError).finally(() => setIsUpdating(false));
  };

  return (
    <Link to={`/product/${product.id}`} className="deal-card">
      <img src={product.main_image} alt={product.name} className="deal-card-image" loading="lazy" decoding="async" />

      <div className="deal-card-info">
        <p className="deal-card-name">{product.name}</p>
        <p className="deal-card-vendor">
          By <span>{vendorName}</span>
        </p>

        <div className="deal-card-bottom">
          <div>
            <span className="deal-card-price">${product.price}</span>
            {product.old_price && (
              <span className="deal-card-old-price">${product.old_price}</span>
            )}
          </div>
          {quantity > 0 ? (
            <div className="qty-stepper deal-card-stepper">
              <button type="button" onClick={handleDecrement} disabled={isUpdating} aria-label="Kamaytirish">
                <Minus size={14} />
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={handleIncrement} disabled={isUpdating} aria-label="Qo'shish">
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button className="deal-card-add" onClick={handleAdd}>
              <ShoppingCart size={14} /> Add
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DealCard;
