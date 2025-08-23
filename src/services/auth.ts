import axios from "axios";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  document: string;
}

const API_BASE_URL = "http://localhost:8080/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (userData: RegisterData) => {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
};
