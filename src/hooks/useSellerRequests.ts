import { useState, useEffect, useCallback } from "react";
import {
  getSellerRequests,
  approveSellerRequest,
  rejectSellerRequest,
  type SellerRequest,
  type PaginatedSellerRequestsResponse,
} from "../services/admin";

export const useSellerRequests = () => {
  const [requests, setRequests] = useState<SellerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const data: PaginatedSellerRequestsResponse = await getSellerRequests(
        currentPage,
        5
      );
      setRequests(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch seller requests:", err);
      setError("Não foi possível carregar as solicitações de vendedores.");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleApprove = async (userId: number) => {
    try {
      await approveSellerRequest(userId);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== userId)
      );
    } catch (err) {
      console.error("Falha ao aprovar a solicitação:", err);
    }
  };

  const handleReject = async (userId: number) => {
    try {
      await rejectSellerRequest(userId);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== userId)
      );
    } catch (err) {
      console.error("Falha ao rejeitar a solicitação:", err);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    requests,
    loading,
    error,
    handleApprove,
    handleReject,
    currentPage,
    totalPages,
    goToPage,
  };
};
