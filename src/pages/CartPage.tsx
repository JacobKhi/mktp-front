import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { createOrderFromCart } from "../services/order";
import { PageCard } from "../components/ui/PageCard";
import { Button } from "../components/Button";
import { Spinner } from "../components/ui/Spinner";

export const CartPage = () => {
  const { cart, loading, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const newOrder = await createOrderFromCart();
      clearCart();
      navigate("/order-confirmation", { state: { order: newOrder } });
    } catch (err) {
      console.error("Falha ao finalizar a compra:", err);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner size="lg" color="border-indigo-600" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <PageCard title="Meu Carrinho">
        <p className="text-center text-gray-500">
          Seu carrinho de compras está vazio.
        </p>
      </PageCard>
    );
  }

  return (
    <PageCard title="Meu Carrinho">
      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.itemId}
            className="flex justify-between items-center border-b pb-4"
          >
            <div>
              <p className="font-semibold">{item.productName}</p>
              <p className="text-sm text-gray-600">
                R$ {item.unitPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.itemId, parseInt(e.target.value, 10))
                }
                className="w-16 text-center border-gray-300 rounded-md"
              />
              <button
                onClick={() => removeFromCart(item.itemId)}
                className="text-red-500 hover:text-red-700"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
        <div className="text-right mt-6">
          <p className="text-xl font-bold">
            Total: R$ {cart.totalAmount.toFixed(2)}
          </p>
          <Button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="mt-4"
          >
            {checkoutLoading ? <Spinner size="sm" /> : "Finalizar Compra"}
          </Button>
        </div>
      </div>
    </PageCard>
  );
};
