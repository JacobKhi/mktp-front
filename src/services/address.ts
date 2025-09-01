import apiClient from "./apiClient";

export interface Address {
  id: number;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
}

export interface AddressCreateData {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
}

export const getAddresses = async (): Promise<Address[]> => {
  const response = await apiClient.get("/addresses");
  return response.data;
};

export const addAddress = async (
  addressData: AddressCreateData
): Promise<Address> => {
  const response = await apiClient.post("/addresses", addressData);
  return response.data;
};

export const deleteAddress = async (addressId: number) => {
  await apiClient.delete(`/addresses/${addressId}`);
};
