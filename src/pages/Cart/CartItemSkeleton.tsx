import "./CartItemSkeleton.css";

const CartItemSkeleton = () => {
  return (
    <div className="cart-item-skeleton">
      <div className="skeleton-block cart-skeleton-image" />
      <div className="cart-skeleton-info">
        <div className="skeleton-block skeleton-line skeleton-line-wide" />
        <div className="skeleton-block skeleton-line skeleton-line-narrow" />
      </div>
      <div className="skeleton-block cart-skeleton-total" />
    </div>
  );
};

export default CartItemSkeleton;
