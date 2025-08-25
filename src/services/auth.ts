import apiClient from "./apiClient";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  document: string;
}

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (userData: RegisterData) => {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
};
