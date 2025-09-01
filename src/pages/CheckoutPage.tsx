import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams, useNavigate } from "react-router-dom";
import { PageCard } from "../components/ui/PageCard";
import { CheckoutForm } from "../components/forms/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const CheckoutPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const handlePaymentSuccess = () => {
    navigate("/my-orders");
  };

  if (!orderId) {
    return <PageCard title="Erro">ID do pedido não encontrado.</PageCard>;
  }

  return (
    <PageCard title="Finalizar Pagamento">
      <Elements stripe={stripePromise}>
        <CheckoutForm
          orderId={parseInt(orderId, 10)}
          onSuccess={handlePaymentSuccess}
        />
      </Elements>
    </PageCard>
  );
};
