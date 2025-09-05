import apiClient from "./apiClient";

export interface PaginatedProductsResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  variations: {
    id: number;
    price: number;
    stock: number;
  }[];
}

export interface ProductFilterParams {
  name?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
}

export interface ProductCreateData {
  name: string;
  description: string;
  brand: string;
  categoryId: number;
  price: number;
  stock: number;
  variationName: string;
}

export interface ProductUpdateData {
  name: string;
  description: string;
  brand: string;
}

export interface SellerProduct {
  id: number;
  name: string;
  brand: string;
}

export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  brand: string;
  category: {
    id: number;
    name: string;
  };
  variations: {
    id: number;
    name: string;
    price: number;
    stock: number;
  }[];
}

export interface VariationData {
  name: string;
  sku?: string;
  price: number;
  stock: number;
}

export const getProducts = async (
  params?: ProductFilterParams
): Promise<PaginatedProductsResponse> => {
  const response = await apiClient.get("/products", { params });
  return response.data;
};

export const getSellerProducts = async (): Promise<SellerProduct[]> => {
  const response = await apiClient.get("/seller/products");
  return response.data;
};

export const createProduct = async (productData: ProductCreateData) => {
  const response = await apiClient.post("/seller/products", productData);
  return response.data;
};

export const deleteProduct = async (productId: number) => {
  await apiClient.delete(`/seller/products/${productId}`);
};

export const updateProduct = async (
  productId: number,
  productData: ProductUpdateData
) => {
  const response = await apiClient.put(
    `/seller/products/${productId}`,
    productData
  );
  return response.data;
};

export const getProductById = async (
  productId: number
): Promise<ProductDetails> => {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data;
};

export const addVariationToProduct = async (
  productId: number,
  variationData: VariationData
) => {
  const response = await apiClient.post(
    `/seller/products/${productId}/variacoes`,
    variationData
  );
  return response.data;
};

export const updateVariation = async (
  variationId: number,
  variationData: VariationData
) => {
  const response = await apiClient.put(
    `/seller/products/variacoes/${variationId}`,
    variationData
  );
  return response.data;
};
