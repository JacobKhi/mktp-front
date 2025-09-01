import apiClient from "./apiClient";

export interface CartItem {
  itemId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Cart {
  cartId: number;
  items: CartItem[];
  totalAmount: number;
}

export const getCart = async (): Promise<Cart> => {
  const response = await apiClient.get("/cart");
  return response.data;
};

export const addToCart = async (
  variationId: number,
  quantity: number
): Promise<Cart> => {
  const response = await apiClient.post("/cart/items", {
    variationId,
    quantity,
  });
  return response.data;
};

export const updateCartItemQuantity = async (
  itemId: number,
  newQuantity: number
): Promise<Cart> => {
  const response = await apiClient.put(`/cart/items/${itemId}`, {
    newQuantity,
  });
  return response.data;
};

export const removeCartItem = async (itemId: number): Promise<Cart> => {
  const response = await apiClient.delete(`/cart/items/${itemId}`);
  return response.data;
};
