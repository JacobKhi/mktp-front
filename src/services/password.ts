import apiClient from "./apiClient";

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export const requestPasswordReset = async (email: string): Promise<string> => {
  const response = await apiClient.post("/auth/forgot-password", {
    email,
  } as ForgotPasswordData);
  return response.data;
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<string> => {
  const response = await apiClient.post("/auth/reset-password", {
    token,
    newPassword,
  } as ResetPasswordData);
  return response.data;
};
