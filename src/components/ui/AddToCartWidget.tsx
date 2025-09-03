import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { Button } from "../Button";

interface AddToCartWidgetProps {
  variationId: number;
  stock: number;
}

export const AddToCartWidget = ({
  variationId,
  stock,
}: AddToCartWidgetProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + amount;
      if (newQuantity < 1) return 1;
      if (newQuantity > stock) return stock;
      return newQuantity;
    });
  };

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    addToCart(variationId, quantity);
    alert(`${quantity} item(s) adicionado(s) ao carrinho!`);
  };

  if (stock === 0) {
    return <p className="text-red-500 font-semibold mt-4">Produto esgotado</p>;
  }

  return (
    <div className="flex items-center gap-4 mt-4">
      <div className="flex items-center border rounded-md">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleQuantityChange(-1);
          }}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
          disabled={quantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          readOnly
          className="w-12 text-center border-l border-r"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleQuantityChange(1);
          }}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
          disabled={quantity >= stock}
        >
          +
        </button>
      </div>
      <Button onClick={handleAddToCart} className="flex-grow">
        Adicionar
      </Button>
    </div>
  );
};
