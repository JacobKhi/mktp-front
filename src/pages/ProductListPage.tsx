import { useFetchProducts } from "../hooks/useFetchProducts";

export const ProductListPage = () => {
  const { products, loading, error } = useFetchProducts();

  if (loading) {
    return <div className="text-center mt-10">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Nossos Produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="border-b p-2">
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
