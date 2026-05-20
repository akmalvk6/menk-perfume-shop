import { Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { createOrder } from "../firebase/orders.js";
import { getProduct } from "../firebase/products.js";
import { formatCurrency } from "../utils/format.js";
import { buildWhatsAppUrl } from "../utils/whatsapp.js";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ customerName: "", customerPhone: "", address: "" });
  const [saving, setSaving] = useState(false);
  const [orderUrl, setOrderUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProduct(productId)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [productId]);

  const total = useMemo(() => Number(product?.price || 0) * qty, [product, qty]);

  async function submitOrder(event) {
    event.preventDefault();
    if (!product) return;
    setSaving(true);
    setMessage("");

    const items = [{ productId: product.id, name: product.name, qty, price: Number(product.price) }];
    const order = { ...form, items, totalAmount: total, address: form.address };
    const whatsappUrl = buildWhatsAppUrl(order);

    try {
      await createOrder(order);
      setOrderUrl(whatsappUrl);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setMessage("Order saved. WhatsApp should open with the prepared message.");
    } catch (error) {
      setMessage(error.message || "Could not save order. You can still send it on WhatsApp.");
      setOrderUrl(whatsappUrl);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <section className="shell py-12 text-white/60">Loading product...</section>;
  if (!product) {
    return (
      <section className="shell py-12 text-white">
        <p className="glass-panel rounded-lg p-6">Product not found.</p>
        <Link to="/products" className="btn-secondary mt-4">Back to catalog</Link>
      </section>
    );
  }

  return (
    <section className="shell grid gap-8 py-10 text-white lg:grid-cols-[1fr_0.9fr]">
      <div className="product-card-3d glass-panel overflow-hidden rounded-lg transition duration-500">
        <img src={product.imageUrl} alt={product.name} className="aspect-[4/3] w-full object-cover" />
      </div>
      <div>
        <span className="badge">{product.category}</span>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-normal">{product.name}</h1>
        <p className="mt-3 text-2xl font-bold text-cyan">{formatCurrency(product.price)}</p>
        <p className="mt-5 leading-7 text-white/65">{product.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {product.size && <span className="badge">{product.size}</span>}
          <span className="badge">{Number(product.stock || 0)} in stock</span>
        </div>

        <form onSubmit={submitOrder} className="glass-panel mt-8 rounded-lg p-5">
          <h2 className="text-lg font-bold">Order details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Name
              <input className="input mt-1" required value={form.customerName} onChange={(event) => setForm({ ...form, customerName: event.target.value })} />
            </label>
            <label className="text-sm font-semibold">
              Phone
              <input className="input mt-1" required value={form.customerPhone} onChange={(event) => setForm({ ...form, customerPhone: event.target.value })} />
            </label>
          </div>
          <label className="mt-4 block text-sm font-semibold">
            Address
            <textarea className="input mt-1 min-h-24" required value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} />
          </label>
          <div className="mt-4 flex items-center justify-between rounded-md border border-white/10 bg-white/10 p-3">
            <div className="flex items-center gap-2">
              <button type="button" className="btn-secondary px-3" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-bold">{qty}</span>
              <button type="button" className="btn-secondary px-3" onClick={() => setQty(qty + 1)} aria-label="Increase quantity">
                <Plus size={16} />
              </button>
            </div>
            <strong>{formatCurrency(total)}</strong>
          </div>
          <button type="submit" className="btn-primary mt-5 w-full" disabled={saving}>
            {saving ? "Saving order..." : "Save & open WhatsApp"}
          </button>
          {orderUrl && <WhatsAppButton href={orderUrl} />}
          {message && <p className="mt-3 text-sm text-white/60">{message}</p>}
        </form>
      </div>
    </section>
  );
}
