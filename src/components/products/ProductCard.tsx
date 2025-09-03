import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  brand: string;
  variations: {
    id: number;
    price: number;
    stock: number;
  }[];
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const displayPrice = product.variations[0]?.price.toFixed(2);

  return (
    <Link to={`/products/${product.id}`} className="block group h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col group-hover:shadow-xl transition-shadow duration-300">
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Imagem</span>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <div className="mt-auto pt-2">
            <p className="text-xl font-bold text-gray-800">R$ {displayPrice}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
