import apiClient from "./apiClient";

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
