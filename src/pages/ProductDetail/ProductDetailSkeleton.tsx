import "./ProductDetailSkeleton.css";

const ProductDetailSkeleton = () => {
  return (
    <div className="container product-detail-layout">
      <div className="product-detail-main">
        <div className="detail-top-skeleton">
          <div className="skeleton-block detail-skeleton-gallery" />
          <div className="detail-skeleton-info">
            <div className="skeleton-block skeleton-line skeleton-line-wide" style={{ height: 22 }} />
            <div className="skeleton-block skeleton-line" style={{ width: "30%" }} />
            <div className="skeleton-block skeleton-line" style={{ width: "40%", height: 26, marginTop: 12 }} />
            <div className="skeleton-block skeleton-line skeleton-line-wide" style={{ marginTop: 20 }} />
            <div className="skeleton-block skeleton-line skeleton-line-wide" />
            <div className="skeleton-block skeleton-line skeleton-line-narrow" />
            <div className="detail-skeleton-actions">
              <div className="skeleton-block" style={{ width: 120, height: 44, borderRadius: 999 }} />
              <div className="skeleton-block" style={{ width: 44, height: 44, borderRadius: "50%" }} />
              <div className="skeleton-block" style={{ width: 44, height: 44, borderRadius: "50%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
