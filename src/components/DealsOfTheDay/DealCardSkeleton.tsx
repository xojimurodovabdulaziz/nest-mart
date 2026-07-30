import "./DealCardSkeleton.css";

const DealCardSkeleton = () => {
  return (
    <div className="deal-card-skeleton">
      <div className="skeleton-block deal-skeleton-image" />
      <div className="deal-skeleton-info">
        <div className="skeleton-block skeleton-line skeleton-line-wide" />
        <div className="skeleton-block skeleton-line skeleton-line-narrow" />
        <div className="deal-skeleton-bottom">
          <div className="skeleton-block deal-skeleton-price" />
          <div className="skeleton-block deal-skeleton-btn" />
        </div>
      </div>
    </div>
  );
};

export default DealCardSkeleton;
