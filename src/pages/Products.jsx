import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { categories } from "../data/fallbackProducts.js";
import useProducts from "../hooks/useProducts.js";

export default function Products() {
  const { products, loading, error } = useProducts();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, products, search]);

  return (
    <section className="shell py-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-saffron">Catalog</p>
          <h1 className="font-display text-4xl font-bold tracking-normal">Perfume, attar & oudh</h1>
        </div>
        <label className="relative block w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input
            className="input pl-10"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products"
          />
        </label>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={`btn px-4 py-2 ${category === item ? "bg-rosewood text-white" : "bg-white text-stone-700 hover:text-rosewood"}`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {error && <p className="mt-6 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {loading ? (
        <p className="mt-10 text-stone-600">Loading products...</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {!loading && filtered.length === 0 && (
        <p className="mt-10 rounded-lg border border-stone-200 bg-white p-6 text-stone-600">
          No products match your search.
        </p>
      )}
    </section>
  );
}
