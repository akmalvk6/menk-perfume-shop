import { ArrowLeft, Check, Minus, Plus, ShoppingBag, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import { useCart } from "../context/CartContext";
import { getProduct } from "../firebase/products";
import { formatCurrency } from "../utils/format";

/* ─── Helpers ─── */

function getSizes(product) {
  if (product.sizes && product.sizes.length > 0) return product.sizes;
  if (product.size && product.price)
    return [{ label: product.size, price: product.price, discountPrice: product.discountPrice || 0 }];
  return [{ label: "Standard", price: product.price, discountPrice: product.discountPrice || 0 }];
}

/* ─── Component ─── */

export default function ProductDetail() {
  const { productId } = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  /* ── Fetch product ── */
  useEffect(() => {
    getProduct(productId)
      .then((p) => {
        setProduct(p);
        if (p) {
          const sizes = getSizes(p);
          setSelectedSize(sizes[sizes.length - 1]);
        }
      })
      .finally(() => setLoading(false));
  }, [productId]);

  /* ── Derived ── */
  const sizes = product ? getSizes(product) : [];
  const originalPrice = selectedSize ? selectedSize.price : product?.price ?? 0;
  const discountPrice = selectedSize?.discountPrice || 0;
  const hasDiscount = discountPrice > 0 && discountPrice < originalPrice;
  const sellingPrice = hasDiscount ? discountPrice : originalPrice;
  const total = useMemo(() => sellingPrice * qty, [sellingPrice, qty]);

  /* ── Add to Cart ── */
  function handleAddToCart() {
    addItem({
      productId,
      name: product.name,
      imageUrl: product.imageUrl,
      category: product.category || "",
      size: selectedSize?.label || product.size || "Standard",
      originalPrice,
      price: sellingPrice,
      qty,
    });
    setAdded(true);
    setQty(1);
    setTimeout(() => setAdded(false), 3000);
  }

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="pt-28 pb-20 text-center">
        <div className="inline-block w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  /* ── Not Found ── */
  if (!product) {
    return (
      <div className="pt-28 pb-20 text-center shell">
        <p className="font-serif text-2xl text-ink mb-4">Product not found</p>
        <Link to="/products" className="btn-outline-gold">
          <ArrowLeft size={16} /> Back to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="shell">
        {/* Breadcrumb */}
        <AnimatedSection className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-ink-light hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Collection
          </Link>
        </AnimatedSection>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* ═══ Product Image ═══ */}
          <AnimatedSection>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="glass-card overflow-hidden"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full aspect-[4/3] object-cover"
              />
            </motion.div>
          </AnimatedSection>

          {/* ═══ Product Info ═══ */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {product.category && (
                  <span className="badge">{product.category}</span>
                )}
                {product.newArrival && (
                  <span className="badge !border-green-200 !bg-green-50 !text-green-700">
                    New Arrival
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl md:text-4xl text-ink font-light">
                {product.name}
              </h1>

              <p className="text-ink-light leading-relaxed">
                {product.description}
              </p>

              {product.stock > 0 && (
                <span className="badge">{product.stock} in stock</span>
              )}

              {/* ── Size Selector ── */}
              <div>
                <label className="block text-xs font-medium tracking-wider uppercase text-ink-light mb-3">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => {
                        setSelectedSize(s);
                        setAdded(false);
                      }}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedSize?.label === s.label
                          ? "bg-gold text-white shadow-gold"
                          : "bg-white border border-ink/10 text-ink-light hover:border-gold/30 hover:text-gold"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Price ── */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-3xl font-serif text-gold">
                  {formatCurrency(sellingPrice)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-xl text-ink-light/40 line-through">
                      {formatCurrency(originalPrice)}
                    </span>
                    <span className="text-xs font-medium text-white bg-red-500 px-2.5 py-1 rounded-full">
                      {Math.round(
                        ((originalPrice - sellingPrice) / originalPrice) * 100,
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>

              {/* ── Quantity ── */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-light font-medium">
                  Quantity
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center text-ink-light hover:border-gold hover:text-gold transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium text-ink text-lg">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center text-ink-light hover:border-gold hover:text-gold transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* ── Total ── */}
              <div className="flex items-center justify-between pt-4 border-t border-ink/5">
                <span className="text-sm text-ink-light">Total</span>
                <span className="font-serif text-2xl text-gold">
                  {formatCurrency(total)}
                </span>
              </div>

              {/* ── Add to Cart ── */}
              {!added ? (
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="btn-primary w-full justify-center text-base gap-3"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </motion.button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
                    <Check size={16} />
                    Added to cart!
                  </div>
                  <div className="flex gap-3">
                    <Link
                      to="/products"
                      className="btn-outline-gold flex-1 justify-center text-sm"
                    >
                      Continue Shopping
                    </Link>
                    <Link
                      to="/cart"
                      className="btn-primary flex-1 justify-center text-sm gap-2"
                    >
                      <ShoppingCart size={16} />
                      View Cart
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
