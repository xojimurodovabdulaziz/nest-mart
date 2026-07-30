import { useEffect, useState } from "react";
import { getReviews, createReview, updateReview, deleteReview } from "../../api/reviews";
import { useToast } from "../../components/Toast/ToastContext";

export function useReviews(productId: string) {
  const { showToast } = useToast();
  const token = localStorage.getItem("access_token");

  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const loadReviews = () => {
    getReviews(productId)
      .then((res) => setReviews(res?.data?.reviews || []))
      .catch(() => setReviews([]));
  };

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const resetForm = () => {
    setRating(5);
    setComment("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      showToast("Izoh qoldirish uchun avval tizimga kiring");
      return;
    }
    if (!comment.trim()) return;

    setIsSending(true);
    try {
      if (editingId) {
        await updateReview(token, editingId, rating, comment.trim());
        showToast("Izohingiz yangilandi", "success");
      } else {
        await createReview(token, productId, rating, comment.trim());
        showToast("Izohingiz qo'shildi", "success");
      }
      resetForm();
      loadReviews();
    } catch (err: any) {
      showToast(err.message);
    } finally {
      setIsSending(false);
    }
  };

  const handleEdit = (review: any) => {
    setEditingId(review.id);
    setRating(review.rating);
    setComment(review.comment);
  };

  const handleDelete = async (reviewId: string) => {
    if (!token) return;
    try {
      await deleteReview(token, reviewId);
      showToast("Izoh o'chirildi", "success");
      loadReviews();
    } catch (err: any) {
      showToast(err.message);
    }
  };

  return {
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
  };
}
