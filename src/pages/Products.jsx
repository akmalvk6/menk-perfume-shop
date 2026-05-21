import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/fallbackProducts";
import useProducts from "../hooks/useProducts";

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Products() {
  const { products, loading, error } = useProducts();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.description?.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [products, category, search]);

  return (
    <div className="pt-28 pb-20">
      <div className="shell">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <span className="badge mb-4">Catalog</span>
          <h1 className="font-serif text-4xl md:text-5xl text-ink font-light mt-4">
            Our Collection
          </h1>
          <div className="gold-line mt-6" />
          <p className="mt-4 text-ink-light max-w-md mx-auto">
            Explore our curated selection of perfumes, attars & oudh.
          </p>
        </AnimatedSection>

        {/* Search & Filters */}
        <AnimatedSection delay={0.1} className="max-w-2xl mx-auto mb-12">
          <div className="relative mb-6">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light/40"
            />
            <input
              type="text"
              placeholder="Search fragrances..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-11"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                  c === category
                    ? "bg-gold text-white shadow-gold"
                    : "bg-white border border-ink/10 text-ink-light hover:border-gold/30 hover:text-gold"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Error */}
        {error && (
          <div className="text-center py-4 mb-8 text-red-600 bg-red-50 rounded-lg border border-red-100 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20 text-ink-light">
            <div className="inline-block w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-4" />
            <p className="text-sm">Loading collection...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-ink-light">
            <p className="text-lg font-serif">No fragrances found</p>
            <p className="text-sm mt-2">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
