import apiClient from "./apiClient";

export interface Category {
  id: number;
  name: string;
}

export interface PaginatedCategoriesResponse {
  content: Category[];
  totalPages: number;
  totalElements: number;
  number: number;
}

interface CategoryCreateData {
  name: string;
  description?: string;
}

export const getCategories = async (): Promise<PaginatedCategoriesResponse> => {
  const response = await apiClient.get("/categories", {
    params: { size: 100 },
  });
  return response.data;
};

export const createCategory = async (
  categoryData: CategoryCreateData
): Promise<Category> => {
  const response = await apiClient.post("/categories", categoryData);
  return response.data;
};
