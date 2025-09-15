import { useState, useEffect, useCallback } from "react";
import {
  getSellerOrders,
  updateOrderStatus,
  addTrackingCode,
  type Order,
  type OrderStatus,
  type PaginatedOrdersResponse,
} from "../services/order";

export const useSellerOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data: PaginatedOrdersResponse = await getSellerOrders(
        currentPage,
        10
      );
      setOrders(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Falha ao buscar pedidos do vendedor:", err);
      setError("Não foi possível carregar os pedidos.");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateStatus = async (
    orderId: number,
    newStatus: OrderStatus
  ) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, ...updatedOrder } : order
        )
      );
    } catch (err) {
      console.error("Falha ao atualizar status do pedido:", err);
    }
  };

  const handleAddTracking = async (orderId: number, trackingCode: string) => {
    try {
      const updatedOrder = await addTrackingCode(orderId, trackingCode);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, ...updatedOrder } : order
        )
      );
    } catch (err) {
      console.error("Falha ao adicionar código de rastreio:", err);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    orders,
    loading,
    error,
    handleUpdateStatus,
    handleAddTracking,
    currentPage,
    totalPages,
    goToPage,
  };
};
