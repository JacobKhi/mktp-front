import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../services/category";
import { PageCard } from "../components/ui/PageCard";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const CreateCategoryPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createCategory({ name, description });
      navigate("/seller/products/create");
    } catch (err) {
      console.error("Falha ao criar categoria:", err);
      setError("Não foi possível criar a categoria. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageCard title="Criar Nova Categoria">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          label="Nome da Categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descrição (Opcional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Categoria"}
        </Button>
      </form>
    </PageCard>
  );
};
