import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getProducts,
  type ProductFilterParams,
  type Product,
} from "../services/product";

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<ProductFilterParams>(() => {
    const params: ProductFilterParams = {};
    const name = searchParams.get("name");
    if (name) params.name = name;
    return params;
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = { ...filters, page: currentPage, size: 8 };
      const data = await getProducts(params);
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Não foi possível carregar os produtos:", err);
      setError("Não foi possível carregar os produtos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    products,
    loading,
    error,
    setFilters,
    currentPage,
    totalPages,
    goToPage,
  };
};
