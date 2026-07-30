import { useState } from "react";
import { Heart, Repeat } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import "./DetailInfo.css";

interface Props {
  product: any;
  quantity: number;
  setQuantity: (q: number) => void;
  isLiked: boolean;
  isComparing: boolean;
  onAddToCart: () => void;
  onWishlist: () => void;
  onCompare: () => void;
}

const DetailInfo = ({
  product,
  quantity,
  setQuantity,
  isLiked,
  isComparing,
  onAddToCart,
  onWishlist,
  onCompare,
}: Props) => {
  const [popKey, setPopKey] = useState<string | null>(null);

  const withPop = (key: string, action: () => void) => () => {
    setPopKey(key);
    setTimeout(() => setPopKey(null), 300);
    action();
  };

  return (
    <div className="detail-info">
      {product.tags?.[0] && <span className="detail-tag-badge">{product.tags[0]} Off</span>}
      <h1>{product.name}</h1>

      <div className="detail-rating">
        <span className="stars">⭐</span>
        <span>({product.reviews_count} reviews)</span>
      </div>

      <div className="detail-price-row">
        <span className="detail-price">${product.price}</span>
        {product.old_price && (
          <>
            <span className="detail-discount">{product.discount_percent}% off</span>
            <span className="detail-old-price">${product.old_price}</span>
          </>
        )}
      </div>

      <p className="detail-description">{product.description}</p>

      <div className="detail-actions">
        <QuantitySelector quantity={quantity} onChange={setQuantity} max={product.stock_qty} />
        <button
          className={`detail-add-btn ${popKey === "cart" ? "pop" : ""}`}
          onClick={withPop("cart", onAddToCart)}
          disabled={!product.in_stock}
        >
          {product.in_stock ? "Add to cart" : "Out of stock"}
        </button>
        <button
          className={`detail-icon-btn ${isLiked ? "active" : ""} ${popKey === "wish" ? "pop" : ""}`}
          onClick={withPop("wish", onWishlist)}
          aria-label="Wishlist"
        >
          <Heart size={18} fill={isLiked ? "#e05252" : "none"} />
        </button>
        <button
          className={`detail-icon-btn ${isComparing ? "active" : ""} ${popKey === "compare" ? "pop" : ""}`}
          onClick={withPop("compare", onCompare)}
          aria-label="Compare"
        >
          <Repeat size={18} />
        </button>
      </div>

      <p className="detail-stock">
        {product.in_stock ? `${product.stock_qty} items in stock` : "Currently unavailable"}
      </p>
    </div>
  );
};

export default DetailInfo;
