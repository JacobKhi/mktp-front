import { useState, useEffect, useCallback } from "react";
import { getMyOrders, type Order, OrderStatus } from "../services/order";
import { getProductReviews } from "../services/review";
import { useAuth } from "./useAuth";

export const useMyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewedProductIds, setReviewedProductIds] = useState<Set<number>>(
    new Set()
  );

  const fetchOrders = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const fetchedOrders = await getMyOrders();
      setOrders(fetchedOrders);

      const deliveredProducts = new Map<number, boolean>();
      fetchedOrders.forEach((order) => {
        if (order.status === OrderStatus.DELIVERED) {
          order.items.forEach((item) => {
            deliveredProducts.set(item.productId, true);
          });
        }
      });

      const idsToUpdate = new Set<number>();
      for (const productId of deliveredProducts.keys()) {
        const reviews = await getProductReviews(productId);
        const userHasReviewed = reviews.some(
          (review) => review.reviewerName === user.name
        );
        if (userHasReviewed) {
          idsToUpdate.add(productId);
        }
      }
      setReviewedProductIds(idsToUpdate);
    } catch (err) {
      console.error("Falha ao buscar pedidos ou avaliações:", err);
      setError("Não foi possível carregar o histórico de pedidos.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const markProductAsReviewed = (productId: number) => {
    setReviewedProductIds((prevIds) => new Set(prevIds).add(productId));
  };

  return {
    orders,
    loading,
    error,
    reviewedProductIds,
    markProductAsReviewed,
  };
};
