import apiClient from "./apiClient";

interface PaymentRequestData {
  paymentToken: string;
  orderId: number;
}

interface PaymentResponse {
  chargeId: string;
  status: string;
  orderNumber: string;
}

export const createPaymentIntent = async (
  orderId: number
): Promise<{ clientSecret: string }> => {
  const response = await apiClient.post(
    `/payments/create-payment-intent/${orderId}`
  );
  return response.data;
};

export const confirmOrderOnBackend = async (orderId: number): Promise<void> => {
  await apiClient.post(`/payments/confirm-order/${orderId}`);
};
