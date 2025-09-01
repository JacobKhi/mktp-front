import { useState } from "react";
import { useAddresses } from "../hooks/useAddresses";
import { type Address, type AddressCreateData } from "../services/address";
import { PageCard } from "../components/ui/PageCard";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Spinner } from "../components/ui/Spinner";
import { ConfirmationModal } from "../components/ui/ConfirmationModal";

const initialFormState: AddressCreateData = {
  zipCode: "",
  street: "",
  number: "",
  complement: "",
  city: "",
  state: "",
};

export const AddressesPage = () => {
  const { addresses, loading, error, handleAddAddress, handleDeleteAddress } =
    useAddresses();
  const [formData, setFormData] = useState<AddressCreateData>(initialFormState);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleAddAddress(formData);
      setFormData(initialFormState);
    } catch (err) {
      // O hook já lida com o log
    }
  };

  const handleConfirmDelete = () => {
    if (addressToDelete) {
      handleDeleteAddress(addressToDelete.id);
      setAddressToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner size="lg" color="border-indigo-600" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <PageCard title="Meus Endereços">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Adicionar Novo Endereço</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <Input
            id="zipCode"
            label="CEP"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
          <Input
            id="street"
            label="Rua"
            value={formData.street}
            onChange={handleChange}
            required
          />
          <Input
            id="number"
            label="Número"
            value={formData.number}
            onChange={handleChange}
            required
          />
          <Input
            id="complement"
            label="Complemento"
            value={formData.complement}
            onChange={handleChange}
          />
          <Input
            id="city"
            label="Cidade"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <Input
            id="state"
            label="Estado"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <div className="sm:col-span-2">
            <Button type="submit">Adicionar Endereço</Button>
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Endereços Salvos</h2>
        {addresses.length > 0 ? (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="p-4 border rounded-md flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {address.street}, {address.number}
                  </p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} - {address.zipCode}
                  </p>
                </div>
                <Button
                  onClick={() => setAddressToDelete(address)}
                  className="bg-red-600 hover:bg-red-700 text-sm py-1 px-3"
                >
                  Excluir
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhum endereço cadastrado.</p>
        )}
      </div>

      <ConfirmationModal
        isOpen={!!addressToDelete}
        title="Confirmar Exclusão"
        onConfirm={handleConfirmDelete}
        onCancel={() => setAddressToDelete(null)}
      >
        Você tem certeza que deseja excluir este endereço?
      </ConfirmationModal>
    </PageCard>
  );
};
