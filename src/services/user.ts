import apiClient from "./apiClient";

export const requestSellerProfile = async () => {
  const response = await apiClient.post("/users/profile/become-seller");
  return response.data;
};

export const getProfile = async () => {
  const response = await apiClient.get("/users/profile");
  return response.data;
};
