import { Edit2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { categories } from "../../data/fallbackProducts.js";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../../firebase/products.js";
import { formatCurrency } from "../../utils/format.js";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  category: "Perfume",
  imageUrl: "",
  stock: "",
  featured: false,
  size: "",
};

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadProducts() {
    setProducts(await getProducts());
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      category: product.category || "Perfume",
      imageUrl: product.imageUrl || "",
      stock: product.stock || "",
      featured: Boolean(product.featured),
      size: product.size || "",
    });
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      if (editingId) {
        await updateProduct(editingId, form);
        setMessage("Product updated.");
      } else {
        await createProduct(form);
        setMessage("Product added.");
      }
      setForm(emptyProduct);
      setEditingId("");
      await loadProducts();
    } catch (error) {
      setMessage(error.message || "Could not save product.");
    } finally {
      setSaving(false);
    }
  }

  async function removeProduct(productId) {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(productId);
    await loadProducts();
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={submit} className="rounded-lg border border-stone-200 bg-white p-5">
        <h1 className="font-display text-3xl font-bold tracking-normal">
          {editingId ? "Edit product" : "Add product"}
        </h1>
        <div className="mt-5 grid gap-4">
          <label className="text-sm font-semibold">
            Name
            <input className="input mt-1" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          </label>
          <label className="text-sm font-semibold">
            Description
            <textarea className="input mt-1 min-h-28" required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Price
              <input className="input mt-1" type="number" min="0" required value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} />
            </label>
            <label className="text-sm font-semibold">
              Stock
              <input className="input mt-1" type="number" min="0" required value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Category
              <select className="input mt-1" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
                {categories.filter((item) => item !== "All").map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold">
              Size
              <input className="input mt-1" placeholder="50 ml" value={form.size} onChange={(event) => setForm({ ...form, size: event.target.value })} />
            </label>
          </div>
          <label className="text-sm font-semibold">
            Image URL
            <input className="input mt-1" required value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} />
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} />
            Featured on homepage
          </label>
          <div className="flex gap-2">
            <button type="submit" className="btn-primary" disabled={saving}>
              <Plus size={17} />
              {saving ? "Saving..." : editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button type="button" className="btn-secondary" onClick={() => { setEditingId(""); setForm(emptyProduct); }}>
                Cancel
              </button>
            )}
          </div>
          {message && <p className="text-sm text-stone-600">{message}</p>}
        </div>
      </form>

      <div>
        <h2 className="font-display text-3xl font-bold tracking-normal">Products</h2>
        <div className="mt-5 grid gap-3">
          {products.map((product) => (
            <article key={product.id} className="flex gap-4 rounded-lg border border-stone-200 bg-white p-3">
              <img src={product.imageUrl} alt={product.name} className="h-24 w-24 rounded-md object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm text-stone-600">{product.category} · {formatCurrency(product.price)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" className="btn-secondary px-3" onClick={() => startEdit(product)} aria-label="Edit product">
                      <Edit2 size={16} />
                    </button>
                    <button type="button" className="btn-secondary px-3 text-red-700" onClick={() => removeProduct(product.id)} aria-label="Delete product">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-stone-600">{product.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
