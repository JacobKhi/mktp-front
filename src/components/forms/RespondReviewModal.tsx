import { useState } from "react";
import { type SellerResponseData } from "../../services/review";
import { Button } from "../Button";
import { Spinner } from "../ui/Spinner";

interface RespondReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewId: number;
  onSave: (reviewId: number, data: SellerResponseData) => Promise<void>;
}

export const RespondReviewModal = ({
  isOpen,
  onClose,
  reviewId,
  onSave,
}: RespondReviewModalProps) => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!response.trim()) return;

    setLoading(true);
    try {
      await onSave(reviewId, { response });
      onClose();
    } catch (error) {
      console.error("Falha ao enviar resposta:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[60]">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Responder à Avaliação</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="response"
              className="block text-sm font-medium text-gray-700"
            >
              Sua Resposta
            </label>
            <textarea
              id="response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows={4}
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Enviar Resposta"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
