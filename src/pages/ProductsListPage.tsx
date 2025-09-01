import { useFetchProducts } from "../hooks/useFetchProducts";
import { ProductCard } from "../components/products/ProductCard";
import { Spinner } from "../components/ui/Spinner";

export const ProductsListPage = () => {
  const { products, loading, error } = useFetchProducts();

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
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Filtros</h2>
            <p className="text-gray-500">Em breve.</p>
          </div>
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p>Nenhum produto encontrado no momento.</p>
          )}
        </main>
      </div>
    </div>
  );
};
