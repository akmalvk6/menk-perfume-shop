import { ArrowLeft, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import WhatsAppButton from "../components/WhatsAppButton";
import { createOrder } from "../firebase/orders";
import { getProduct } from "../firebase/products";
import { formatCurrency } from "../utils/format";
import { buildWhatsAppUrl } from "../utils/whatsapp";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    address: "",
  });
  const [saving, setSaving] = useState(false);
  const [orderUrl, setOrderUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProduct(productId)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [productId]);

  const total = useMemo(
    () => (product ? product.price * qty : 0),
    [product, qty],
  );

  async function submitOrder(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const items = [
      { productId, name: product.name, qty, price: product.price },
    ];
    const order = {
      ...form,
      items,
      totalAmount: total,
      address: form.address,
      status: "pending",
      whatsappSent: true,
      createdAt: new Date(),
    };

    const url = buildWhatsAppUrl(order);

    try {
      await createOrder(order);
      setOrderUrl(url);
      window.open(url, "_blank");
      setMessage("Order saved! Confirm on WhatsApp.");
    } catch {
      setOrderUrl(url);
      setMessage("Could not save — please use WhatsApp link below.");
    } finally {
      setSaving(false);
    }
  }

  /* Loading State */
  if (loading) {
    return (
      <div className="pt-28 pb-20 text-center">
        <div className="inline-block w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  /* Not Found */
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
          {/* Product Image */}
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

          {/* Product Info + Order Form */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-5">
              {product.category && (
                <span className="badge">{product.category}</span>
              )}

              <h1 className="font-serif text-3xl md:text-4xl text-ink font-light">
                {product.name}
              </h1>

              <p className="text-3xl font-serif text-gold">
                {formatCurrency(product.price)}
              </p>

              <p className="text-ink-light leading-relaxed">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {product.size && (
                  <span className="badge">{product.size}</span>
                )}
                {product.stock > 0 && (
                  <span className="badge">{product.stock} in stock</span>
                )}
              </div>

              {/* Order Form */}
              <form
                onSubmit={submitOrder}
                className="glass-card p-6 space-y-4 mt-2"
              >
                <h3 className="font-serif text-xl text-ink">
                  Place Your Order
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Your name"
                    value={form.customerName}
                    onChange={(e) =>
                      setForm({ ...form, customerName: e.target.value })
                    }
                    className="input"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone number"
                    value={form.customerPhone}
                    onChange={(e) =>
                      setForm({ ...form, customerPhone: e.target.value })
                    }
                    className="input"
                  />
                </div>

                <textarea
                  required
                  rows={2}
                  placeholder="Delivery address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="input resize-none"
                />

                {/* Quantity Stepper */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-light">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-9 h-9 rounded-full border border-ink/10 flex items-center justify-center text-ink-light hover:border-gold hover:text-gold transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-medium text-ink">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(qty + 1)}
                      className="w-9 h-9 rounded-full border border-ink/10 flex items-center justify-center text-ink-light hover:border-gold hover:text-gold transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-4 border-t border-ink/5">
                  <span className="text-sm text-ink-light">Total</span>
                  <span className="font-serif text-2xl text-gold">
                    {formatCurrency(total)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary w-full justify-center"
                >
                  {saving ? "Saving..." : "Save & Open WhatsApp"}
                </button>

                {orderUrl && <WhatsAppButton href={orderUrl} />}

                {message && (
                  <p
                    className={`text-sm text-center ${
                      message.includes("Could not")
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
