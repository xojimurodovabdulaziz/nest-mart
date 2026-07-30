import StarInput from "./StarInput";
import "./ReviewItem.css";

interface Props {
  review: any;
  isOwner: boolean;
  onEdit: (r: any) => void;
  onDelete: (id: string) => void;
}

const ReviewItem = ({ review, isOwner, onEdit, onDelete }: Props) => {
  return (
    <div className="review-item">
      <div className="review-avatar">
        {review.user?.avatar_url ? (
          <img src={review.user.avatar_url} alt={review.user.full_name} />
        ) : (
          (review.user?.full_name || "U").charAt(0).toUpperCase()
        )}
      </div>
      <div className="review-body">
        <div className="review-header">
          <p className="review-author">{review.user?.full_name || "User"}</p>
          <StarInput value={review.rating} onChange={() => {}} size={14} readonly />
        </div>
        <p className="review-text">{review.comment}</p>

        {isOwner && (
          <div className="review-owner-actions">
            <button onClick={() => onEdit(review)}>Edit</button>
            <button onClick={() => onDelete(review.id)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;
