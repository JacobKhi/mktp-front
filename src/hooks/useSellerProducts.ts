import { useState, useEffect, useCallback } from "react";
import {
  getSellerProducts,
  deleteProduct,
  type SellerProduct,
  type PaginatedProductsResponse,
} from "../services/product";

export const useSellerProducts = () => {
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data: PaginatedProductsResponse = await getSellerProducts(
        currentPage,
        10
      );
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Falha ao buscar produtos do vendedor:", err);
      setError("Não foi possível carregar seus produtos.");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (productId: number) => {
    try {
      await deleteProduct(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (err) {
      console.error("Falha ao deletar produto:", err);
      setError("Não foi possível deletar o produto.");
    }
  };

  return {
    products,
    loading,
    error,
    handleDelete,
    currentPage,
    totalPages,
    goToPage,
  };
};
