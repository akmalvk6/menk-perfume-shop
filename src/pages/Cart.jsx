import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Cart() {
  const { items, removeItem, updateQty, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-20">
        <div className="shell text-center py-20">
          <ShoppingBag size={48} className="mx-auto text-ink-light/20 mb-4" />
          <h1 className="font-serif text-3xl text-ink mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-ink-light mb-8">
            Discover our curated collection and add your favourites.
          </p>
          <Link to="/products" className="btn-primary">
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="shell max-w-3xl">
        <AnimatedSection className="mb-8">
          <span className="badge mb-4">Cart</span>
          <h1 className="font-serif text-3xl md:text-4xl text-ink font-light mt-4">
            Your Cart
            <span className="text-ink-light/40 text-2xl ml-3">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          </h1>
          <div className="gold-line mt-4 mx-0" style={{ marginLeft: 0 }} />
        </AnimatedSection>

        {/* ── Cart Items ── */}
        <div className="space-y-4 mb-8">
          {items.map((item, i) => (
            <motion.div
              key={`${item.productId}-${item.size}`}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4"
            >
              <div className="flex gap-4">
                {/* Thumbnail */}
                <Link
                  to={`/products/${item.productId}`}
                  className="shrink-0"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to={`/products/${item.productId}`}
                        className="font-serif text-lg text-ink hover:text-gold transition-colors"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="badge text-[10px] py-0.5">
                          {item.size}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-xs text-ink-light/40 line-through">
                            {formatCurrency(item.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.productId, item.size)}
                      className="p-1.5 text-ink-light/30 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Price + Qty */}
                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQty(
                            item.productId,
                            item.size,
                            item.qty - 1,
                          )
                        }
                        disabled={item.qty <= 1}
                        className="w-7 h-7 rounded-full border border-ink/10 flex items-center justify-center text-ink-light hover:border-gold hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-ink">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          updateQty(
                            item.productId,
                            item.size,
                            item.qty + 1,
                          )
                        }
                        className="w-7 h-7 rounded-full border border-ink/10 flex items-center justify-center text-ink-light hover:border-gold hover:text-gold transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span className="font-serif text-lg text-gold">
                      {formatCurrency(item.price * item.qty)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Footer ── */}
        <AnimatedSection>
          <div className="glass-card p-6">
            {/* Total */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-ink-light font-medium">Order Total</span>
              <span className="font-serif text-3xl text-gold">
                {formatCurrency(cartTotal)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/products"
                className="btn-outline-gold flex-1 justify-center"
              >
                Continue Shopping
              </Link>
              <Link
                to="/checkout"
                className="btn-primary flex-1 justify-center text-base gap-2"
              >
                Place Order
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
