import apiClient from "./apiClient";

interface ProductCreateData {
  name: string;
  description: string;
  brand: string;
  categoryId: number;
  price: number;
  stock: number;
  variationName: string;
}

export const createProduct = async (productData: ProductCreateData) => {
  const response = await apiClient.post("/seller/products", productData);
  return response.data;
};
