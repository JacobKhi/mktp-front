import apiClient from "./apiClient";

export interface Order {
  id: number;
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  customerName: string;
  trackingCode?: string;
  items: {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
}

export const OrderStatus = {
  PROCESSING: "PROCESSING",
  PAYMENT_APPROVED: "PAYMENT_APPROVED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELED: "CANCELED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

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

export const getSellerOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get("/seller/orders");
  return response.data;
};

export const updateOrderStatus = async (
  orderId: number,
  newStatus: OrderStatus
): Promise<Order> => {
  const response = await apiClient.patch(`/seller/orders/${orderId}/status`, {
    newStatus,
  });
  return response.data;
};

export const addTrackingCode = async (
  orderId: number,
  trackingCode: string
): Promise<Order> => {
  const response = await apiClient.patch(`/seller/orders/${orderId}/tracking`, {
    trackingCode,
  });
  return response.data;
};
