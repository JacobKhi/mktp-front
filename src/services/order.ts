import apiClient from "./apiClient";

export interface Order {
  id: number;
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  customerName: string;
  items: {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
}

export const getMyOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get("/orders");
  return response.data;
};

export const getOrderById = async (orderId: number): Promise<Order> => {
  const response = await apiClient.get(`/orders/${orderId}`);
  return response.data;
};

export const createOrderFromCart = async (): Promise<Order> => {
  const response = await apiClient.post("/orders/from-cart");
  return response.data;
};
