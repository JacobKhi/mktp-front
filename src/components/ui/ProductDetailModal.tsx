import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type ProductDetails } from "../../services/product";
import {
  getProductReviews,
  addSellerResponse,
  type Review,
  type SellerResponseData,
} from "../../services/review";
import { Button } from "../Button";
import { Spinner } from "./Spinner";
import { RespondReviewModal } from "../forms/RespondReviewModal";

interface ProductDetailModalProps {
  product: ProductDetails | null;
  onClose: () => void;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ))}
  </div>
);

export const ProductDetailModal = ({
  product,
  onClose,
}: ProductDetailModalProps) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [respondingTo, setRespondingTo] = useState<number | null>(null);

  useEffect(() => {
    if (product) {
      setLoadingReviews(true);
      getProductReviews(product.id)
        .then(setReviews)
        .catch((err) => console.error("Falha ao buscar avaliações:", err))
        .finally(() => setLoadingReviews(false));
    }
  }, [product]);

  if (!product) {
    return null;
  }

  const handleGoToEdit = () => {
    navigate(`/seller/products/edit/${product.id}`);
  };

  const handleSaveResponse = async (
    reviewId: number,
    data: SellerResponseData
  ) => {
    try {
      const updatedReview = await addSellerResponse(reviewId, data);
      setReviews((prevReviews) =>
        prevReviews.map((r) => (r.id === reviewId ? updatedReview : r))
      );
    } catch (err) {
      console.error("Falha ao salvar resposta:", err);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 overflow-y-auto p-4"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-4 flex-shrink-0">
            {product.name}
          </h2>

          <div className="space-y-4 text-gray-700 overflow-y-auto pr-2">
            <p>
              <strong>Marca:</strong> {product.brand || "Não informada"}
            </p>
            <p>
              <strong>Descrição:</strong>{" "}
              {product.description || "Não informada"}
            </p>
            <p>
              <strong>Categoria:</strong> {product.category.name}
            </p>
            <h3 className="text-xl font-semibold mt-6 border-t pt-4">
              Variações
            </h3>
            <ul className="divide-y divide-gray-200">
              {product.variations.map((variation) => (
                <li key={variation.id} className="py-2 flex justify-between">
                  <span>{variation.name}</span>
                  <span className="font-mono">
                    R$ {variation.price.toFixed(2)} | Estoque: {variation.stock}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mt-6 border-t pt-4">
              Avaliações
            </h3>
            {loadingReviews ? (
              <Spinner />
            ) : reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{review.reviewerName}</p>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-gray-600 mt-1">{review.comment}</p>
                    {review.sellerResponse ? (
                      <div className="mt-2 p-2 bg-gray-100 rounded-md">
                        <p className="font-semibold text-sm">Sua Resposta:</p>
                        <p className="text-gray-600 text-sm">
                          {review.sellerResponse}
                        </p>
                      </div>
                    ) : (
                      <div className="text-right mt-2">
                        <Button
                          onClick={() => setRespondingTo(review.id)}
                          className="text-xs py-1 px-2 w-auto"
                        >
                          Responder
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                Este produto ainda não tem avaliações.
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t flex-shrink-0">
            <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-600">
              Fechar
            </Button>
            <Button onClick={handleGoToEdit}>Ir para Edição</Button>
          </div>
        </div>
      </div>

      {respondingTo !== null && (
        <RespondReviewModal
          isOpen={respondingTo !== null}
          onClose={() => setRespondingTo(null)}
          reviewId={respondingTo}
          onSave={handleSaveResponse}
        />
      )}
    </>
  );
};
