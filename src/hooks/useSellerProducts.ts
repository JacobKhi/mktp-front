import { useState, useEffect, useCallback } from "react";
import {
  getSellerProducts,
  deleteProduct,
  type SellerProduct,
} from "../services/product";

export const useSellerProducts = () => {
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getSellerProducts();
      setProducts(data);
    } catch (err) {
      console.error("Falha ao buscar produtos do vendedor:", err);
      setError("Não foi possível carregar seus produtos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
  };
};
