import { useState, useEffect, useCallback } from "react";
import {
  getSellerRequests,
  approveSellerRequest,
  rejectSellerRequest,
} from "../services/admin";

interface SellerRequest {
  id: number;
  name: string;
  email: string;
}

export const useSellerRequests = () => {
  const [requests, setRequests] = useState<SellerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getSellerRequests();
      setRequests(data);
    } catch (err) {
      console.error("Falha ao buscar solicitações:", err);
      setError("Não foi possível carregar as solicitações.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleApprove = async (userId: number) => {
    try {
      await approveSellerRequest(userId);
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.id !== userId)
      );
    } catch (err) {
      console.error("Falha ao aprovar solicitação:", err);
    }
  };

  const handleReject = async (userId: number) => {
    try {
      await rejectSellerRequest(userId);
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.id !== userId)
      );
    } catch (err) {
      console.error("Falha ao rejeitar solicitação:", err);
    }
  };

  return {
    requests,
    loading,
    error,
    handleApprove,
    handleReject,
  };
};
