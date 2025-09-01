import { useState, type ReactNode, useEffect, useMemo } from "react";
import {
  getCart,
  addToCart as apiAddToCart,
  updateCartItemQuantity,
  removeCartItem,
  type Cart,
} from "../services/cart";
import { CartContext } from "./cartContext";
import { useAuth } from "../hooks/useAuth";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      getCart()
        .then(setCart)
        .catch((err) => console.error("Falha ao buscar carrinho inicial:", err))
        .finally(() => setLoading(false));
    } else {
      setCart(null);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const addToCart = async (variationId: number, quantity: number) => {
    const updatedCart = await apiAddToCart(variationId, quantity);
    setCart(updatedCart);
  };

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    const updatedCart = await updateCartItemQuantity(itemId, newQuantity);
    setCart(updatedCart);
  };

  const removeFromCart = async (itemId: number) => {
    const updatedCart = await removeCartItem(itemId);
    setCart(updatedCart);
  };

  const itemCount = useMemo(() => {
    return cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  }, [cart]);

  const value = {
    cart,
    itemCount,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
