import { useState, useEffect, useCallback } from "react";
import {
  getAddresses,
  addAddress,
  deleteAddress,
  type Address,
  type AddressCreateData,
  type PaginatedAddressesResponse,
} from "../services/address";

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = useCallback(async () => {
    try {
      setLoading(true);
      const data: PaginatedAddressesResponse = await getAddresses();
      setAddresses(data.content);
    } catch (err) {
      console.error("Falha ao buscar endereços:", err);
      setError("Não foi possível carregar seus endereços.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleAddAddress = async (addressData: AddressCreateData) => {
    try {
      const newAddress = await addAddress(addressData);
      setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
    } catch (err) {
      console.error("Falha ao adicionar endereço:", err);
      throw err;
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    try {
      await deleteAddress(addressId);
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.id !== addressId)
      );
    } catch (err) {
      console.error("Falha ao deletar endereço:", err);
      setError("Não foi possível remover o endereço.");
    }
  };

  return {
    addresses,
    loading,
    error,
    handleAddAddress,
    handleDeleteAddress,
  };
};
