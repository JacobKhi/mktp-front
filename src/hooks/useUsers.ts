import { useState, useEffect, useCallback } from "react";
import {
  getAllUsers,
  toggleUserActivation,
  deleteUser,
  type AdminUser,
} from "../services/admin";
import { useAuth } from "./useAuth";

export const useUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      const filteredData = data.filter((user) => user.id !== currentUser?.id);
      setUsers(filteredData);
    } catch (err) {
      console.error("Falha ao buscar utilizadores:", err);
      setError("Não foi possível carregar a lista de utilizadores.");
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleActivation = async (userId: number) => {
    try {
      await toggleUserActivation(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isActive: !user.isActive } : user
        )
      );
    } catch (err) {
      console.error("Falha ao ativar/desativar utilizador:", err);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Falha ao apagar utilizador:", err);
    }
  };

  return {
    users,
    loading,
    error,
    handleToggleActivation,
    handleDeleteUser,
  };
};
