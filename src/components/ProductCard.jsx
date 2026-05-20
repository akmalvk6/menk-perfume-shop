import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/format.js";

export default function ProductCard({ product }) {
  return (
    <article className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-stone-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-saffron">
              {product.category}
            </p>
            <h3 className="mt-1 text-base font-bold text-ink">{product.name}</h3>
          </div>
          <span className="whitespace-nowrap text-sm font-bold text-rosewood">
            {formatCurrency(product.price)}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-600">
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
