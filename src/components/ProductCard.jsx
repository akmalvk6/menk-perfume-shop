import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/format.js";

export default function ProductCard({ product }) {
  return (
    <article className="product-card-3d glass-panel overflow-hidden rounded-lg transition duration-500">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-black/30">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover opacity-90 transition duration-700 hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-velvet/85 via-transparent to-white/10" />
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
            {product.category}
          </span>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">Signature pick</p>
            <h3 className="mt-1 text-base font-bold text-white">{product.name}</h3>
          </div>
          <span className="whitespace-nowrap text-sm font-bold text-cyan">
            {formatCurrency(product.price)}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/58">
          {product.description}
        </p>
        <Link to={`/products/${product.id}`} className="btn-secondary mt-4 w-full">
          <MessageCircle size={17} />
          View & Order
        </Link>
      </div>
    </article>
  );
}
