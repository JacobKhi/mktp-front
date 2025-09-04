import apiClient from "./apiClient";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  profile: "CUSTOMER" | "SELLER" | "ADMIN";
  isActive: boolean;
}

export const getSellerRequests = async () => {
  const response = await apiClient.get("/admin/users/seller-requests");
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

export const getAllUsers = async (): Promise<AdminUser[]> => {
  const response = await apiClient.get("/admin/users");
  return response.data;
};

export const toggleUserActivation = async (userId: number): Promise<void> => {
  await apiClient.patch(`/admin/users/${userId}/activation`);
};

export const deleteUser = async (userId: number): Promise<void> => {
  await apiClient.delete(`/admin/users/${userId}`);
};
