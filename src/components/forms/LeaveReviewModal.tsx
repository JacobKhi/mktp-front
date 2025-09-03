import { useState } from "react";
import { type ReviewCreateData, createReview } from "../../services/review";
import { Button } from "../Button";
import { Spinner } from "../ui/Spinner";
import axios from "axios";

interface LeaveReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  orderId: number; // Recebe o orderId
  onReviewSubmit: () => void;
}

export const LeaveReviewModal = ({
  isOpen,
  onClose,
  productId,
  orderId,
  onReviewSubmit,
}: LeaveReviewModalProps) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const reviewData: ReviewCreateData = {
      productId,
      orderId,
      rating,
      comment,
    };

    try {
      await createReview(reviewData);
      onReviewSubmit();
      onClose();
    } catch (err) {
      console.error("Falha ao submeter avaliação:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.message ||
            "Não foi possível enviar a sua avaliação. Tente novamente."
        );
      } else {
        setError("Não foi possível enviar a sua avaliação. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Avaliar Produto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sua nota (de 1 a 5)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-3xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Comentário
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Enviar Avaliação"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
