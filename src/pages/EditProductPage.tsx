import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  updateProduct,
  type ProductUpdateData,
} from "../services/product";
import { PageCard } from "../components/ui/PageCard";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const EditProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductUpdateData>({
    name: "",
    description: "",
    brand: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const product = await getProductById(parseInt(productId, 10));
        setFormData({
          name: product.name,
          description: product.description,
          brand: product.brand,
        });
      } catch (err) {
        console.error("Falha ao buscar dados do produto:", err);
        setError("Não foi possível carregar os dados para edição.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!productId) return;

    setLoading(true);
    setError(null);

    try {
      await updateProduct(parseInt(productId, 10), formData);
      navigate("/my-products");
    } catch (err) {
      console.error("Falha ao atualizar produto:", err);
      setError("Não foi possível salvar as alterações.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">Carregando dados do produto...</div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <PageCard title="Editar Produto">
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
        <Input
          id="brand"
          label="Marca"
          value={formData.brand}
          onChange={handleChange}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </form>
    </PageCard>
  );
};
