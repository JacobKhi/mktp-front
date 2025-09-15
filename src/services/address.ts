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

export interface PaginatedAddressesResponse {
  content: Address[];
  totalPages: number;
  totalElements: number;
  number: number;
}

export const getAddresses = async (): Promise<PaginatedAddressesResponse> => {
  const response = await apiClient.get("/addresses", {
    params: { page: 0, size: 5 },
  });
  //const response = await apiClient.get("/addresses");
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
