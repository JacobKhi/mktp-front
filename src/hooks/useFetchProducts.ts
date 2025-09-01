import { useState, useEffect } from "react";
import { getProducts } from "../services/api";

interface Product {
  id: number;
  name: string;
  brand: string;
  variations: {
    id: number;
    price: number;
  }[];
}

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Não foi possível carregar os produtos:", err);
        setError("Não foi possível carregar os produtos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
