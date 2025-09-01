import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { Button } from "../Button";

interface Product {
  id: number;
  name: string;
  brand: string;
  variations: {
    id: number;
    price: number;
  }[];
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const displayPrice = product.variations[0]?.price.toFixed(2);
  const firstVariationId = product.variations[0]?.id;

  const handleAddToCart = () => {
    if (firstVariationId) {
      addToCart(firstVariationId, 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Imagem</span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p className="mt-2 text-xl font-bold text-gray-800">
          R$ {displayPrice}
        </p>

        {user?.profile === "CUSTOMER" && (
          <Button onClick={handleAddToCart} className="w-full mt-4">
            Adicionar ao Carrinho
          </Button>
        )}
      </div>
    </div>
  );
};
