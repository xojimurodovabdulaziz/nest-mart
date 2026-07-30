import { Link } from "react-router-dom";
import { X, Star, Minus, Plus, ShoppingCart } from "lucide-react";
import "./QuickView.css";

interface Product {
  id: string;
  name: string;
  price: number;
  old_price?: number;
  main_image: string;
  rating: number;
  reviews_count?: number;
}

interface Props {
  product: Product;
  vendorName?: string;
  quantity: number;
  isUpdating: boolean;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onClose: () => void;
}

const QuickView = ({
  product,
  vendorName,
  quantity,
  isUpdating,
  onAdd,
  onIncrement,
  onDecrement,
  onClose,
}: Props) => {
  return (
    <div className="quick-view-overlay" onClick={onClose}>
      <div className="quick-view-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="quick-view-close" onClick={onClose} aria-label="Yopish">
          <X size={18} />
        </button>

        <div className="quick-view-body">
          <img src={product.main_image} alt={product.name} className="quick-view-image" />

          <div className="quick-view-info">
            <h3>{product.name}</h3>

            <div className="quick-view-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.round(product.rating) ? "#f59e0b" : "none"}
                  color="#f59e0b"
                />
              ))}
              {product.reviews_count !== undefined && <span>({product.reviews_count})</span>}
            </div>

            <p className="quick-view-vendor">
              By <span>{vendorName || "Nest Mart"}</span>
            </p>

            <div className="quick-view-price-row">
              <span className="quick-view-price">${product.price}</span>
              {product.old_price && <span className="quick-view-old-price">${product.old_price}</span>}
            </div>

            {quantity > 0 ? (
              <div className="qty-stepper quick-view-stepper">
                <button type="button" onClick={onDecrement} disabled={isUpdating} aria-label="Kamaytirish">
                  <Minus size={14} />
                </button>
                <span>{quantity}</span>
                <button type="button" onClick={onIncrement} disabled={isUpdating} aria-label="Qo'shish">
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button type="button" className="add-to-cart-btn quick-view-add-btn" onClick={onAdd}>
                <ShoppingCart size={14} /> Add to cart
              </button>
            )}

            <Link to={`/product/${product.id}`} className="quick-view-full-link">
              To'liq ma'lumot &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
