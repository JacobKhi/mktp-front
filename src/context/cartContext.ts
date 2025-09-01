import { createContext } from "react";
import { type Cart } from "../services/cart";

export interface CartContextType {
  cart: Cart | null;
  itemCount: number;
  loading: boolean;
  addToCart: (variationId: number, quantity: number) => Promise<void>;
  updateQuantity: (itemId: number, newQuantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
