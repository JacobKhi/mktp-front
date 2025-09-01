import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { confirmOrderOnBackend } from "../../services/payment";
import { Button } from "../Button";
import { Spinner } from "../ui/Spinner";

interface CheckoutFormProps {
  orderId: number;
  onSuccess: () => void;
}

export const CheckoutForm = ({ orderId, onSuccess }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (stripeError) {
      setError(
        stripeError.message || "Ocorreu um erro ao processar o pagamento."
      );
      setLoading(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        await confirmOrderOnBackend(orderId);
        onSuccess();
      } catch (backendError) {
        setError(
          "O pagamento foi aprovado, mas houve um erro ao confirmar seu pedido. Por favor, entre em contato com o suporte."
        );
        setLoading(false);
      }
    } else {
      setError("O pagamento não pôde ser concluído.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={!stripe || loading} className="w-full">
        {loading ? <Spinner size="sm" /> : "Pagar Agora"}
      </Button>
    </form>
  );
};
