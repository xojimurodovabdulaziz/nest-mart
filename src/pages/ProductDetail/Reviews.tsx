import { useReviews } from "./useReviews";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import "./Reviews.css";

const Reviews = ({ productId }: { productId: string }) => {
  const userId = localStorage.getItem("user_id");
  const {
    reviews,
    rating,
    setRating,
    comment,
    setComment,
    editingId,
    isSending,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useReviews(productId);

  return (
    <div className="reviews-section">
      <h2>Reviews</h2>

      <ReviewForm
        rating={rating}
        setRating={setRating}
        comment={comment}
        setComment={setComment}
        isSending={isSending}
        isEditing={!!editingId}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      {reviews.length === 0 && <p className="reviews-empty">No reviews yet</p>}

      <div className="reviews-list">
        {reviews.map((r) => (
          <ReviewItem
            key={r.id}
            review={r}
            isOwner={r.user_id === userId}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
