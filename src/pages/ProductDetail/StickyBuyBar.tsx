import { Heart, Star } from "lucide-react";
import "./StickyBuyBar.css";

interface Props {
  product: any;
  isLiked: boolean;
  onWishlist: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  visible: boolean;
}

const StickyBuyBar = ({ product, isLiked, onWishlist, onAddToCart, onBuyNow, visible }: Props) => {
  return (
    <div className={`sticky-buy-bar ${visible ? "visible" : ""}`}>
      <div className="container sticky-buy-bar-inner">
        <img src={product.main_image} alt={product.name} className="sticky-buy-thumb" />

        <div className="sticky-buy-info">
          <p className="sticky-buy-name">{product.name}</p>
          <div className="sticky-buy-rating">
            <Star size={13} fill="#f5a623" stroke="none" />
            <span>
              {product.rating || "—"} ({product.reviews_count || 0})
            </span>
          </div>
        </div>

        <div className="sticky-buy-price-block">
          <span className="sticky-buy-price">${product.price}</span>
          {product.old_price && (
            <div className="sticky-buy-discount-row">
              <span className="sticky-buy-old-price">${product.old_price}</span>
              <span className="sticky-buy-discount-badge">-{product.discount_percent}%</span>
            </div>
          )}
        </div>

        <button
          type="button"
          className={`sticky-buy-heart ${isLiked ? "active" : ""}`}
          onClick={onWishlist}
          aria-label="Sevimlilarga qo'shish"
        >
          <Heart size={17} fill={isLiked ? "#e05252" : "none"} />
        </button>

        <button type="button" className="sticky-buy-cart-btn" onClick={onAddToCart} disabled={!product.in_stock}>
          Savatga qo'shish
        </button>

        <button type="button" className="sticky-buy-now-btn" onClick={onBuyNow} disabled={!product.in_stock}>
          Sotib olish
        </button>
      </div>
    </div>
  );
};

export default StickyBuyBar;
