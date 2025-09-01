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

export const processPayment = async (
  paymentData: PaymentRequestData
): Promise<PaymentResponse> => {
  const response = await apiClient.post("/payments", paymentData);
  return response.data;
};
