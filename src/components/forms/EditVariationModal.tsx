import { useState, useEffect } from "react";
import { type VariationData } from "../../services/product";
import { Input } from "../Input";
import { Button } from "../Button";
import { Spinner } from "../ui/Spinner";

interface EditVariationModalProps {
  isOpen: boolean;
  onClose: () => void;
  variation: { id: number; name: string; price: number; stock: number } | null;
  onSave: (variationId: number, data: VariationData) => Promise<void>;
}

export const EditVariationModal = ({
  isOpen,
  onClose,
  variation,
  onSave,
}: EditVariationModalProps) => {
  const [formData, setFormData] = useState<VariationData>({
    name: "",
    price: 0,
    stock: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (variation) {
      setFormData({
        name: variation.name,
        price: variation.price,
        stock: variation.stock,
      });
    }
  }, [variation]);

  if (!isOpen || !variation) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await onSave(variation.id, formData);
      onClose();
    } catch (error) {
      console.error("Falha ao atualizar variação", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Editar Variação</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            label="Nome da Variação"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="price"
              label="Preço (R$)"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <Input
              id="stock"
              label="Estoque"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
