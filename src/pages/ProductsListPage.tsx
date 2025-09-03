import { useFetchProducts } from "../hooks/useFetchProducts";
import { ProductCard } from "../components/products/ProductCard";
import { Spinner } from "../components/ui/Spinner";
import { ProductFilters } from "../components/products/ProductFilters";

export const ProductsListPage = () => {
  const { products, loading, error, setFilters } = useFetchProducts();

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <ProductFilters onFilterChange={setFilters} />
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5">
          {loading ? (
            <div className="flex justify-center mt-10">
              <Spinner size="lg" color="border-indigo-600" />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Nenhum produto encontrado com os filtros aplicados.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};
