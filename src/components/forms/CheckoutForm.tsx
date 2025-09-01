import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { processPayment } from "../../services/payment";
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

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setLoading(false);
      return;
    }

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (stripeError || !paymentMethod) {
      setError(
        stripeError?.message ||
          "Ocorreu um erro ao processar os dados do cartão."
      );
      setLoading(false);
      return;
    }

    try {
      await processPayment({
        paymentToken: paymentMethod.id,
        orderId: orderId,
      });
      onSuccess();
    } catch (backendError) {
      console.error("Falha no pagamento no backend:", backendError);
      setError("Não foi possível processar o pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dados do Cartão de Crédito
        </label>
        <div className="p-3 border rounded-md">
          <CardElement />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={!stripe || loading} className="w-full">
        {loading ? <Spinner size="sm" /> : "Pagar Agora"}
      </Button>
    </form>
  );
};
