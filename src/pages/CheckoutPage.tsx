import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams, useNavigate } from "react-router-dom";
import { PageCard } from "../components/ui/PageCard";
import { CheckoutForm } from "../components/forms/CheckoutForm";
import { createPaymentIntent } from "../services/payment";
import { getOrderById, type Order } from "../services/order";
import { Spinner } from "../components/ui/Spinner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const CheckoutPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      const orderIdNum = parseInt(orderId, 10);

      getOrderById(orderIdNum)
        .then((orderData) => {
          setOrder(orderData);
          if (orderData.status !== "PROCESSING") {
            setError("Este pedido não pode mais ser pago.");
            setLoading(false);
            return;
          }
          return createPaymentIntent(orderIdNum);
        })
        .then((intentData) => {
          if (intentData) {
            setClientSecret(intentData.clientSecret);
          }
        })
        .catch((err) => {
          console.error("Falha ao iniciar o checkout:", err);
          setError("Não foi possível carregar os detalhes do pagamento.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [orderId]);

  const handlePaymentSuccess = () => {
    navigate("/my-orders");
  };

  if (!orderId) {
    return <PageCard title="Erro">ID do pedido não encontrado.</PageCard>;
  }

  if (loading) {
    return (
      <PageCard title="Finalizar Pagamento">
        <div className="flex justify-center">
          <Spinner />
        </div>
      </PageCard>
    );
  }

  if (error) {
    return <PageCard title="Erro">{error}</PageCard>;
  }

  return (
    <PageCard title="Finalizar Pagamento">
      {order && (
        <div className="mb-6 p-4 border rounded-md bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Resumo do Pedido</h2>
          <div className="flex justify-between">
            <span className="text-gray-600">Número do Pedido:</span>
            <span className="font-mono">{order.orderNumber}</span>
          </div>
          <div className="flex justify-between mt-2 text-xl font-bold">
            <span>Total a Pagar:</span>
            <span>R$ {order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      )}

      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            orderId={parseInt(orderId, 10)}
            onSuccess={handlePaymentSuccess}
          />
        </Elements>
      )}
    </PageCard>
  );
};
