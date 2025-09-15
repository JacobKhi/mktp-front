import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  updateProduct,
  updateVariation,
  addVariationToProduct,
  type ProductDetails,
  type ProductUpdateData,
  type VariationData,
} from "../services/product";
import { PageCard } from "../components/ui/PageCard";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Spinner } from "../components/ui/Spinner";
import { EditVariationModal } from "../components/forms/EditVariationModal";
import { AddVariationForm } from "../components/forms/AddVariationForm";

type Variation = ProductDetails["variations"][0];

export const EditProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );

  const [formData, setFormData] = useState<ProductUpdateData>({
    name: "",
    description: "",
    brand: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingVariation, setEditingVariation] = useState<Variation | null>(
    null
  );

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const product = await getProductById(parseInt(productId, 10));
        setProductDetails(product);
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

    setSubmitLoading(true);
    setError(null);

    try {
      await updateProduct(parseInt(productId, 10), formData);
      navigate("/my-products");
    } catch (err) {
      console.error("Falha ao atualizar produto:", err);
      setError("Não foi possível salvar as alterações.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSaveVariation = async (
    variationId: number,
    data: VariationData
  ) => {
    if (!productId) return;
    try {
      const updatedVariation = await updateVariation(
        parseInt(productId, 10),
        variationId,
        data
      );
      setProductDetails((prevDetails) => {
        if (!prevDetails) return null;
        return {
          ...prevDetails,
          variations: prevDetails.variations.map((v) =>
            v.id === variationId ? { ...v, ...updatedVariation } : v
          ),
        };
      });
    } catch (err) {
      console.error("Falha ao atualizar variação:", err);
      throw err;
    }
  };

  const handleAddNewVariation = async (variationData: VariationData) => {
    if (!productId) return;
    try {
      const newVariation = await addVariationToProduct(
        parseInt(productId, 10),
        variationData
      );
      setProductDetails((prevDetails) => {
        if (!prevDetails) return null;
        return {
          ...prevDetails,
          variations: [...prevDetails.variations, newVariation],
        };
      });
    } catch (err) {
      console.error("Falha ao adicionar nova variação:", err);
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
        <Button type="submit" disabled={submitLoading}>
          {submitLoading ? "Salvando..." : "Salvar Alterações do Produto"}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t">
        <h2 className="text-2xl font-bold mb-4">Gerenciar Variações</h2>
        <div className="space-y-4">
          {productDetails?.variations.map((variation) => (
            <div
              key={variation.id}
              className="p-4 border rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{variation.name}</p>
                <p className="text-sm text-gray-600">
                  Preço: R$ {variation.price.toFixed(2)} | Estoque:{" "}
                  {variation.stock}
                </p>
              </div>
              <Button
                onClick={() => setEditingVariation(variation)}
                className="bg-blue-600 hover:bg-blue-700 text-sm py-1 px-3 w-auto"
              >
                Editar
              </Button>
            </div>
          ))}
        </div>

        <AddVariationForm onAddVariation={handleAddNewVariation} />
      </div>

      <EditVariationModal
        isOpen={!!editingVariation}
        onClose={() => setEditingVariation(null)}
        variation={editingVariation}
        onSave={handleSaveVariation}
      />
    </PageCard>
  );
};
