import apiClient from "./apiClient";

export interface Category {
  id: number;
  name: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get("/categories");
  return response.data;
};
