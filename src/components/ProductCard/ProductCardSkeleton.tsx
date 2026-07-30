import "./ProductCardSkeleton.css";

const ProductCardSkeleton = () => {
  return (
    <div className="product-card-skeleton">
      <div className="skeleton-block skeleton-image" />
      <div className="skeleton-block skeleton-line skeleton-line-wide" />
      <div className="skeleton-block skeleton-line skeleton-line-narrow" />
      <div className="skeleton-footer">
        <div className="skeleton-block skeleton-price" />
        <div className="skeleton-block skeleton-btn" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
