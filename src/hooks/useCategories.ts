import { useState, useEffect } from "react";
import { getCategories, type Category } from "../services/category";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.content);
      } catch (err) {
        console.error("Falha ao buscar categorias:", err);
        setError("Não foi possível carregar as categorias.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
