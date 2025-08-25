import apiClient from "./apiClient";

export const requestSellerProfile = async () => {
  const response = await apiClient.post("/users/profile/become-seller");
  return response.data;
};
