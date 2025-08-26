import { useNavigate } from "react-router-dom";
import { type ProductDetails } from "../../services/product";
import { Button } from "../Button";

interface ProductDetailModalProps {
  product: ProductDetails | null;
  onClose: () => void;
}

export const ProductDetailModal = ({
  product,
  onClose,
}: ProductDetailModalProps) => {
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const handleGoToEdit = () => {
    navigate(`/seller/products/edit/${product.id}`);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Marca:</strong> {product.brand || "Não informada"}
          </p>
          <p>
            <strong>Descrição:</strong> {product.description || "Não informada"}
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
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
          <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-600">
            Fechar
          </Button>
          <Button onClick={handleGoToEdit}>Ir para Edição</Button>
        </div>
      </div>
    </div>
  );
};
