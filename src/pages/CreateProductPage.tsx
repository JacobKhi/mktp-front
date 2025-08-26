import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/product";
import { useCategories } from "../hooks/useCategories";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { PageCard } from "../components/ui/PageCard";

export const CreateProductPage = () => {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    categoryId: 0,
    price: 0,
    stock: 0,
    variationName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length > 0) {
      setFormData((prev) => ({
        ...prev,
        categoryId: categories[0].id,
      }));
    }
  }, [categories]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value, type } = event.target;
    const isNumber =
      type === "number" || event.target instanceof HTMLSelectElement;
    setFormData((prev) => ({
      ...prev,
      [id]: isNumber ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createProduct(formData);
      navigate("/my-products");
    } catch (err) {
      console.error("Falha ao criar produto:", err);
      setError("Não foi possível criar o produto. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  if (categoriesLoading) {
    return (
      <div className="text-center mt-10">Carregando dados necessários...</div>
    );
  }

  if (categoriesError) {
    return (
      <div className="text-center mt-10 text-red-500">{categoriesError}</div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Nenhuma Categoria Encontrada</h1>
        <p className="mt-4 text-gray-600">
          Você não pode cadastrar um produto porque nenhuma categoria foi criada
          ainda.
          <br />
          Por favor, peça a um administrador para cadastrar as categorias
          primeiro.
        </p>
      </div>
    );
  }

  return (
    <PageCard title="Cadastrar Novo Produto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          label="Nome do Produto"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descrição
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700"
          >
            Categoria
          </label>
          <select
            id="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          id="brand"
          label="Marca"
          value={formData.brand}
          onChange={handleChange}
        />
        <Input
          id="variationName"
          label="Nome da Variação (Ex: Cor, Tamanho)"
          value={formData.variationName}
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

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar Produto"}
        </Button>
      </form>
    </PageCard>
  );
};
