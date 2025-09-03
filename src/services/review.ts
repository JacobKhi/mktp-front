import apiClient from "./apiClient";

export interface ReviewCreateData {
  productId: number;
  orderId: number;
  rating: number;
  comment: string;
}

export interface SellerResponseData {
  response: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  reviewDate: string;
  reviewerName: string;
  sellerResponse?: string;
  responseDate?: string;
}

export const createReview = async (
  reviewData: ReviewCreateData
): Promise<Review> => {
  const response = await apiClient.post("/reviews", reviewData);
  return response.data;
};

export const addSellerResponse = async (
  reviewId: number,
  responseData: SellerResponseData
): Promise<Review> => {
  const response = await apiClient.post(
    `/seller/reviews/${reviewId}/response`,
    responseData
  );
  return response.data;
};

export const getProductReviews = async (
  productId: number
): Promise<Review[]> => {
  const response = await apiClient.get(`/products/${productId}/reviews`);
  return response.data;
};
