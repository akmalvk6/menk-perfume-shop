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
    <section className="shell py-10 text-white">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">Catalog</p>
          <h1 className="font-display text-4xl font-semibold tracking-normal">Perfume, attar & oudh</h1>
        </div>
        <label className="relative block w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45" size={18} />
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
            className={`btn px-4 py-2 ${category === item ? "border border-white/20 bg-white text-velvet" : "border border-white/15 bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"}`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {error && <p className="mt-6 rounded-md border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">{error}</p>}
      {loading ? (
        <p className="mt-10 text-white/60">Loading products...</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {!loading && filtered.length === 0 && (
        <p className="glass-panel mt-10 rounded-lg p-6 text-white/65">
          No products match your search.
        </p>
      )}
    </section>
  );
}
