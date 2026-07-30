import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star, Minus, Plus, Eye } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../Toast/ToastContext";
import Badge from "../ui/Badge/Badge";
import Button from "../ui/Button/Button";
import QuickView from "./QuickView";
import "./ProductCard.css";
import "./ProductBadges.css";

interface Product {
  id: string;
  name: string;
  price: number;
  old_price?: number;
  discount_percent?: number;
  main_image: string;
  rating: number;
  reviews_count?: number;
  tags?: string[];
}

interface Props {
  product: Product;
  categoryName?: string;
  vendorName?: string;
}

const ProductCard = ({ product, categoryName, vendorName }: Props) => {
  const { items, addToCart, removeFromCart } = useCart();
  const { ids, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isLiked = ids.has(product.id);
  const [isAddPopping, setIsAddPopping] = useState(false);
  const [isLikePopping, setIsLikePopping] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const cartItem = items.find((item) => item.product_id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  // Not-logged-in is the only case that should send the shopper away from
  // the page they're on. Any other failure (network hiccup, server error)
  // should surface as a toast so a real click doesn't silently teleport
  // them to /login for no visible reason.
  const isLoggedIn = () => Boolean(localStorage.getItem("access_token"));

  const handleActionError = () => {
    if (!isLoggedIn()) {
      showToast("Savatga qo'shish uchun avval tizimga kiring", "error");
      navigate("/login");
    } else {
      showToast("Xatolik yuz berdi, qayta urinib ko'ring", "error");
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddPopping(true);
    setTimeout(() => setIsAddPopping(false), 300);
    addToCart(product.id).catch(handleActionError);
  };

  // NOTE: backend /api/public/cart POST endpoint quantity'ni "yakuniy son"
  // emas, "necha dona qo'shish/ayirish" (delta) sifatida talqin qiladi.
  // Shu sababli bu yerda har doim faqat 1 (yoki -1) yuboriladi, quantity + 1
  // emas.
  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isUpdating) return;
    setIsUpdating(true);
    addToCart(product.id, 1)
      .catch(handleActionError)
      .finally(() => setIsUpdating(false));
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isUpdating) return;
    setIsUpdating(true);
    const action =
      quantity <= 1 ? removeFromCart(product.id) : addToCart(product.id, -1);
    action.catch(handleActionError).finally(() => setIsUpdating(false));
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLikePopping(true);
    setTimeout(() => setIsLikePopping(false), 300);
    toggleWishlist(product.id).catch(handleActionError);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <Link to={`/product/${product.id}`} className="product-card">
        {product.discount_percent ? (
          <Badge tone="discount" position="left">
            {product.discount_percent}%
          </Badge>
        ) : null}
        {product.tags?.includes("Sale") && <Badge tone="sale">Sale</Badge>}
        {product.tags?.includes("New") && <Badge tone="new">New</Badge>}
        {product.tags?.includes("Hot") && <Badge tone="hot">Hot</Badge>}

        <button
          type="button"
          className={`wishlist-btn ${isLikePopping ? "pop" : ""}`}
          onClick={handleToggleLike}
          aria-pressed={isLiked}
          aria-label={isLiked ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
        >
          <Heart size={16} fill={isLiked ? "#e05252" : "none"} color={isLiked ? "#e05252" : "#999"} />
        </button>

        <button className="quick-view-btn" onClick={handleOpenQuickView} aria-label="Tez ko'rish">
          <Eye size={15} />
        </button>

        <img src={product.main_image} alt={product.name} className="product-image" loading="lazy" decoding="async" />

        {categoryName && <p className="product-eyebrow">{categoryName}</p>}
        <h3 className="product-name">{product.name}</h3>

        <div className="product-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} fill={i < Math.round(product.rating) ? "#f59e0b" : "none"} color="#f59e0b" />
          ))}
          {product.reviews_count !== undefined && <span>{product.reviews_count}</span>}
        </div>

        <p className="product-vendor">By <span>{vendorName || "Nest Mart"}</span></p>

        <div className="product-price-row">
          <span className="product-price">${product.price}</span>
          {product.old_price && <span className="product-old-price">${product.old_price}</span>}
        </div>

        {quantity > 0 ? (
          <div className="qty-stepper">
            <button type="button" onClick={handleDecrement} disabled={isUpdating} aria-label="Kamaytirish">
              <Minus size={14} />
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={handleIncrement} disabled={isUpdating} aria-label="Qo'shish">
              <Plus size={14} />
            </button>
          </div>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            className={`add-to-cart-btn ${isAddPopping ? "pop" : ""}`}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={14} /> Add
          </Button>
        )}
      </Link>

      {isQuickViewOpen && (
        <QuickView
          product={product}
          vendorName={vendorName}
          quantity={quantity}
          isUpdating={isUpdating}
          onAdd={() => addToCart(product.id).catch(handleActionError)}
          onIncrement={() => {
            if (isUpdating) return;
            setIsUpdating(true);
            addToCart(product.id, 1)
              .catch(handleActionError)
              .finally(() => setIsUpdating(false));
          }}
          onDecrement={() => {
            if (isUpdating) return;
            setIsUpdating(true);
            const action =
              quantity <= 1 ? removeFromCart(product.id) : addToCart(product.id, -1);
            action.catch(handleActionError).finally(() => setIsUpdating(false));
          }}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;