import apiClient from "./apiClient";

export interface Category {
  id: number;
  name: string;
}

interface CategoryCreateData {
  name: string;
  description?: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get("/categories");
  return response.data;
};

export const createCategory = async (
  categoryData: CategoryCreateData
): Promise<Category> => {
  const response = await apiClient.post("/categories", categoryData);
  return response.data;
};
