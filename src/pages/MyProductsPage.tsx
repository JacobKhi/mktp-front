import { useState } from "react";
import { Link } from "react-router-dom";
import { useSellerProducts } from "../hooks/useSellerProducts";
import {
  getProductById,
  type ProductDetails,
  type SellerProduct,
} from "../services/product";
import { PageCard } from "../components/ui/PageCard";
import { Button } from "../components/Button";
import { ConfirmationModal } from "../components/ui/ConfirmationModal";
import { ProductDetailModal } from "../components/ui/ProductDetailModal";
import { Spinner } from "../components/ui/Spinner";
import { PaginationControls } from "../components/ui/PaginationControls";

export const MyProductsPage = () => {
  const {
    products,
    loading,
    error,
    handleDelete,
    currentPage,
    totalPages,
    goToPage,
  } = useSellerProducts();

  const [productToDelete, setProductToDelete] = useState<SellerProduct | null>(
    null
  );

  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(
    null
  );
  const [detailsLoading, setDetailsLoading] = useState(false);

  const handleConfirmDelete = () => {
    if (productToDelete) {
      handleDelete(productToDelete.id);
      setProductToDelete(null);
    }
  };

  const handleViewDetails = async (productId: number) => {
    setDetailsLoading(true);
    try {
      const details = await getProductById(productId);
      setSelectedProduct(details);
    } catch (err) {
      console.error("Falha ao buscar detalhes do produto:", err);
    } finally {
      setDetailsLoading(false);
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
    <PageCard title="Meus Produtos">
      <div className="mb-6 flex flex-col sm:flex-row justify-end gap-4">
        <Link to="/seller/categories/create">
          <Button className="bg-gray-600 hover:bg-gray-700">
            Criar Nova Categoria
          </Button>
        </Link>
        <Link to="/seller/products/create">
          <Button>Cadastrar Novo Produto</Button>
        </Link>
      </div>

      {products.length > 0 ? (
        <>
          <ul className="divide-y divide-gray-200">
            {products.map((product) => (
              <li
                key={product.id}
                className="py-4 flex flex-col sm:flex-row justify-between items-center"
              >
                <div>
                  <button
                    onClick={() => handleViewDetails(product.id)}
                    className="text-lg font-medium text-indigo-600 hover:underline text-left"
                    disabled={detailsLoading}
                  >
                    {product.name}
                  </button>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                </div>
                <div className="flex gap-4 mt-4 sm:mt-0">
                  <Link to={`/seller/products/edit/${product.id}`}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-sm py-1 px-3">
                      Editar
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setProductToDelete(product)}
                    className="bg-red-600 hover:bg-red-700 text-sm py-1 px-3"
                  >
                    Excluir
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </>
      ) : (
        <p className="text-center text-gray-500">
          Você ainda não cadastrou nenhum produto.
        </p>
      )}

      <ConfirmationModal
        isOpen={!!productToDelete}
        title="Confirmar Exclusão"
        onConfirm={handleConfirmDelete}
        onCancel={() => setProductToDelete(null)}
      >
        Você tem certeza que deseja excluir o produto{" "}
        <strong>{productToDelete?.name}</strong>? Esta ação não pode ser
        desfeita.
      </ConfirmationModal>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </PageCard>
  );
};
