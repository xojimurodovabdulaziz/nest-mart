import StarInput from "./StarInput";

interface Props {
  rating: number;
  setRating: (n: number) => void;
  comment: string;
  setComment: (s: string) => void;
  isSending: boolean;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ReviewForm = ({
  rating,
  setRating,
  comment,
  setComment,
  isSending,
  isEditing,
  onSubmit,
  onCancel,
}: Props) => {
  return (
    <form className="review-form" onSubmit={onSubmit}>
      <StarInput value={rating} onChange={setRating} />
      <textarea
        placeholder="Share your thoughts about this product..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="review-form-actions">
        <button type="submit" disabled={isSending}>
          {isSending ? "Sending..." : isEditing ? "Update review" : "Post review"}
        </button>
        {isEditing && (
          <button type="button" className="review-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
