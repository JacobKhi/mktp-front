import apiClient from "./apiClient";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  profile: "CUSTOMER" | "SELLER" | "ADMIN";
  isActive: boolean;
}

export interface PaginatedUsersResponse {
  content: AdminUser[];
  totalPages: number;
}

export interface SellerRequest {
  id: number;
  name: string;
  email: string;
}

export interface PaginatedSellerRequestsResponse {
  content: SellerRequest[];
  totalPages: number;
}

export const getSellerRequests = async (
  page: number = 0,
  size: number = 10
): Promise<PaginatedSellerRequestsResponse> => {
  const response = await apiClient.get("/admin/users/seller-requests", {
    params: { page, size },
  });
  return response.data;
};

export const approveSellerRequest = async (userId: number) => {
  const response = await apiClient.post(
    `/admin/users/${userId}/approve-seller`
  );
  return response.data;
};

export const rejectSellerRequest = async (userId: number) => {
  const response = await apiClient.post(`/admin/users/${userId}/reject-seller`);
  return response.data;
};

export const getAllUsers = async (
  page: number = 0,
  size: number = 10
): Promise<PaginatedUsersResponse> => {
  const response = await apiClient.get("/admin/users", {
    params: { page, size },
  });
  return response.data;
};

export const toggleUserActivation = async (userId: number): Promise<void> => {
  await apiClient.patch(`/admin/users/${userId}/activation`);
};

export const deleteUser = async (userId: number): Promise<void> => {
  await apiClient.delete(`/admin/users/${userId}`);
};
