import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById, type ProductDetails } from "../services/product";
import { getProductReviews, type Review } from "../services/review";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { PageCard } from "../components/ui/PageCard";
import { Spinner } from "../components/ui/Spinner";
import { AddToCartWidget } from "../components/ui/AddToCartWidget";

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

export const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { user } = useAuth();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariationId, setSelectedVariationId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!productId) {
      setError("Produto não encontrado.");
      setLoading(false);
      return;
    }

    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(parseInt(productId, 10));
        setProduct(productData);

        if (productData.variations.length > 0) {
          setSelectedVariationId(productData.variations[0].id);
        }

        const reviewsData = await getProductReviews(parseInt(productId, 10));
        setReviews(reviewsData);
      } catch (err) {
        console.error("Falha ao buscar detalhes do produto:", err);
        setError("Não foi possível carregar os dados do produto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner size="lg" color="border-indigo-600" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!product) {
    return <PageCard title="Produto não encontrado" />;
  }

  const selectedVariation = product.variations.find(
    (v) => v.id === selectedVariationId
  );

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
        <p className="text-gray-800 mb-6">{product.description}</p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Variações</h2>
          <div className="flex gap-2">
            {product.variations.map((variation) => (
              <button
                key={variation.id}
                onClick={() => setSelectedVariationId(variation.id)}
                className={`px-4 py-2 rounded-md border-2 ${
                  selectedVariationId === variation.id
                    ? "border-indigo-600 bg-indigo-100"
                    : "border-gray-300"
                }`}
              >
                {variation.name}
              </button>
            ))}
          </div>
        </div>

        {selectedVariation && (
          <div className="mb-6">
            <p className="text-2xl font-bold text-indigo-700">
              R$ {selectedVariation.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              Estoque: {selectedVariation.stock}
            </p>
          </div>
        )}

        {user?.profile === "CUSTOMER" &&
          selectedVariationId &&
          selectedVariation && (
            <AddToCartWidget
              variationId={selectedVariationId}
              stock={selectedVariation.stock}
            />
          )}

        <div className="mt-8 pt-6 border-t">
          <h2 className="text-2xl font-bold mb-4">Avaliações de Clientes</h2>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-2">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.reviewerName}</p>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-gray-600 mt-1">{review.comment}</p>
                  {review.sellerResponse && (
                    <div className="mt-2 p-2 bg-gray-100 rounded-md">
                      <p className="font-semibold text-sm">
                        Resposta do Vendedor:
                      </p>
                      <p className="text-gray-600 text-sm">
                        {review.sellerResponse}
                      </p>
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
      </div>
    </div>
  );
};
