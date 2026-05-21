import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/format";

export default function ProductCard({ product }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="glass-card overflow-hidden group"
    >
      <Link to={`/products/${product.id}`} className="block">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {product.category && (
            <span className="absolute top-4 left-4 badge text-[10px]">
              {product.category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-xl text-ink mb-1 group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gold font-medium text-lg mb-2">
            {formatCurrency(product.price)}
          </p>
          <p className="text-ink-light text-sm line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-gold/60 group-hover:text-gold transition-colors">
            View Details
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
