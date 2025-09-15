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

export interface ReviewUpdateData {
  rating: number;
  comment: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  reviewDate: string;
  reviewerName: string;
  sellerResponse?: string;
  responseDate?: string;
  productId: number;
}

export interface PaginatedReviewsResponse {
  content: Review[];
  totalPages: number;
}

export const createReview = async (
  reviewData: ReviewCreateData
): Promise<Review> => {
  const response = await apiClient.post("/reviews", reviewData);
  return response.data;
};

export const updateReview = async (
  reviewId: number,
  reviewData: ReviewUpdateData
): Promise<Review> => {
  const response = await apiClient.put(`/reviews/${reviewId}`, reviewData);
  return response.data;
};

export const deleteReview = async (reviewId: number): Promise<void> => {
  await apiClient.delete(`/reviews/${reviewId}`);
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
  productId: number,
  page: number = 0,
  size: number = 10
): Promise<PaginatedReviewsResponse> => {
  const response = await apiClient.get(`/products/${productId}/reviews`, {
    params: { page, size },
  });
  return response.data;
};
