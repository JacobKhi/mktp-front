import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { type ProductFilterParams } from "../../services/product";
import { Input } from "../Input";
import { Button } from "../Button";

interface ProductFiltersProps {
  onFilterChange: (filters: ProductFilterParams) => void;
}

const initialState = {
  name: "",
  categoryId: 0,
  minPrice: "",
  maxPrice: "",
};

export const ProductFilters = ({ onFilterChange }: ProductFiltersProps) => {
  const { categories } = useCategories();
  const [filterState, setFilterState] = useState(initialState);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFilterState((prev) => ({ ...prev, [id]: value }));
  };

  const handleApplyFilters = (event: React.FormEvent) => {
    event.preventDefault();
    const params: ProductFilterParams = {
      name: filterState.name || undefined,
      categoryId: parseInt(String(filterState.categoryId), 10) || undefined,
      minPrice: parseFloat(filterState.minPrice) || undefined,
      maxPrice: parseFloat(filterState.maxPrice) || undefined,
    };
    onFilterChange(params);
  };

  const handleClearFilters = () => {
    setFilterState(initialState);
    onFilterChange({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Filtros</h2>
      <form onSubmit={handleApplyFilters} className="space-y-4">
        <Input
          id="name"
          label="Nome do Produto"
          value={filterState.name}
          onChange={handleChange}
        />

        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700"
          >
            Categoria
          </label>
          <select
            id="categoryId"
            value={filterState.categoryId}
            onChange={handleChange}
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
          >
            <option value={0}>Todas</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            id="minPrice"
            label="Preço Mín."
            type="number"
            placeholder="R$ 0"
            value={filterState.minPrice}
            onChange={handleChange}
          />
          <Input
            id="maxPrice"
            label="Preço Máx."
            type="number"
            placeholder="R$ 1000"
            value={filterState.maxPrice}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button type="submit">Aplicar Filtros</Button>
          <Button
            type="button"
            onClick={handleClearFilters}
            className="bg-gray-600 hover:bg-gray-700"
          >
            Limpar Filtros
          </Button>
        </div>
      </form>
    </div>
  );
};
