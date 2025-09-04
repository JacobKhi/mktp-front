import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, type ProductFilterParams } from "../services/product";

interface Product {
  id: number;
  name: string;
  brand: string;
  variations: {
    id: number;
    price: number;
    stock: number;
  }[];
}

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      const data = await getProducts(filters);
      setProducts(data);
    } catch (err) {
      console.error("Não foi possível carregar os produtos:", err);
      setError("Não foi possível carregar os produtos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, setFilters };
};
