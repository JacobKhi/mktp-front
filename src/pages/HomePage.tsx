import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { ProductCard } from "../components/products/ProductCard";
import { Spinner } from "../components/ui/Spinner";
import { Button } from "../components/Button";

export const HomePage = () => {
  const { products, loading } = useFetchProducts();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?name=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div>
      <section className="bg-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            O seu Marketplace Completo
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Encontre tudo o que precisa, de vendedores a compradores, num só
            lugar.
          </p>
          <form
            onSubmit={handleSearchSubmit}
            className="flex justify-center max-w-lg mx-auto"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="O que está à procura?"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" className="rounded-l-none">
              Pesquisar
            </Button>
          </form>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Produtos em Destaque
          </h2>
          {loading ? (
            <div className="flex justify-center">
              <Spinner size="lg" color="border-indigo-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/products">
              <Button className="w-auto">Ver Todos os Produtos</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
