import { useState } from "react";
import { type VariationData } from "../../services/product";
import { Input } from "../Input";
import { Button } from "../Button";
import { Spinner } from "../ui/Spinner";

interface AddVariationFormProps {
  onAddVariation: (variationData: VariationData) => Promise<void>;
}

const initialFormState: VariationData = {
  name: "",
  price: 0,
  stock: 0,
  sku: "",
};

export const AddVariationForm = ({ onAddVariation }: AddVariationFormProps) => {
  const [formData, setFormData] = useState<VariationData>(initialFormState);
  const [loading, setLoading] = useState(false);

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
      await onAddVariation(formData);
      setFormData(initialFormState);
    } catch (error) {
      console.error("Falha ao adicionar variação:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 border border-dashed rounded-md">
      <h3 className="text-xl font-semibold mb-4">Adicionar Nova Variação</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          label="Nome da Variação (Ex: Cor, Tamanho)"
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
        <div className="text-right">
          <Button type="submit" disabled={loading} className="w-auto">
            {loading ? <Spinner size="sm" /> : "Adicionar Variação"}
          </Button>
        </div>
      </form>
    </div>
  );
};
