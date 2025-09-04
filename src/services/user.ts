import apiClient from "./apiClient";

export interface ProfileUpdateData {
  name: string;
  phoneNumber: string;
}

export const requestSellerProfile = async () => {
  const response = await apiClient.post("/users/profile/become-seller");
  return response.data;
};

export const getProfile = async () => {
  const response = await apiClient.get("/users/profile");
  return response.data;
};

export const updateProfile = async (profileData: ProfileUpdateData) => {
  const response = await apiClient.put("/users/profile", profileData);
  return response.data;
};
