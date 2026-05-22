import { Edit2, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { categories } from "../../data/fallbackProducts.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../firebase/products.js";
import { formatCurrency } from "../../utils/format.js";

const emptySize = { label: "", price: "", discountPrice: "" };

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  discountPrice: "",
  category: "Perfume",
  imageUrl: "",
  stock: "",
  featured: false,
  newArrival: false,
  size: "",
  sizes: [],
};

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  /* ── Size rows state ── */
  const [sizeRows, setSizeRows] = useState([{ ...emptySize }]);

  async function loadProducts() {
    setProducts(await getProducts());
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function addSizeRow() {
    setSizeRows([...sizeRows, { ...emptySize }]);
  }

  function removeSizeRow(index) {
    if (sizeRows.length <= 1) return;
    setSizeRows(sizeRows.filter((_, i) => i !== index));
  }

  function updateSizeRow(index, field, value) {
    const updated = sizeRows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row,
    );
    setSizeRows(updated);
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      discountPrice: product.discountPrice || "",
      category: product.category || "Perfume",
      imageUrl: product.imageUrl || "",
      stock: product.stock || "",
      featured: Boolean(product.featured),
      newArrival: Boolean(product.newArrival),
      size: product.size || "",
      sizes: product.sizes || [],
    });

    /* Populate size rows from existing product */
    if (product.sizes && product.sizes.length > 0) {
      setSizeRows(
        product.sizes.map((s) => ({
          label: s.label || "",
          price: String(s.price || ""),
          discountPrice: String(s.discountPrice || ""),
        })),
      );
    } else if (product.size && product.price) {
      setSizeRows([
        {
          label: product.size,
          price: String(product.price),
          discountPrice: String(product.discountPrice || ""),
        },
      ]);
    } else {
      setSizeRows([{ ...emptySize }]);
    }
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    /* Build sizes array from rows */
    const validSizes = sizeRows
      .filter((row) => row.label.trim() && row.price)
      .map((row) => ({
        label: row.label.trim(),
        price: Number(row.price),
        discountPrice: row.discountPrice ? Number(row.discountPrice) : 0,
      }));

    /* Use the last size as the default display price */
    const lastSize = validSizes.length > 0 ? validSizes[validSizes.length - 1] : null;
    const defaultSize = validSizes.length > 0 ? validSizes[0].label : form.size;
    const defaultPrice = lastSize ? lastSize.price : form.price;
    const defaultDiscount = lastSize ? lastSize.discountPrice : 0;

    const payload = {
      ...form,
      price: defaultPrice,
      discountPrice: defaultDiscount,
      size: defaultSize,
      sizes: validSizes,
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
        setMessage("Product updated.");
      } else {
        await createProduct(payload);
        setMessage("Product added.");
      }
      setForm(emptyProduct);
      setSizeRows([{ ...emptySize }]);
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
      {/* ═══ Form ═══ */}
      <form
        onSubmit={submit}
        className="rounded-lg border border-stone-200 bg-white p-5"
      >
        <h1 className="font-display text-3xl font-bold tracking-normal">
          {editingId ? "Edit product" : "Add product"}
        </h1>

        <div className="mt-5 grid gap-4">
          {/* Name */}
          <label className="text-sm font-semibold">
            Name
            <input
              className="input mt-1"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          {/* Description */}
          <label className="text-sm font-semibold">
            Description
            <textarea
              className="input mt-1 min-h-28"
              required
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>

          {/* Sizes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Sizes & Pricing</span>
              <button
                type="button"
                className="btn-secondary px-3 py-1 text-xs"
                onClick={addSizeRow}
              >
                <Plus size={14} /> Add Size
              </button>
            </div>

            {/* Column headers */}
            <div
              className="grid gap-2 mb-1"
              style={{ gridTemplateColumns: "1fr 90px 90px 32px" }}
            >
              <span className="text-xs text-stone-400">Size</span>
              <span className="text-xs text-stone-400">Price (₹)</span>
              <span className="text-xs text-stone-400">Offer (₹)</span>
              <span />
            </div>

            <div className="space-y-2">
              {sizeRows.map((row, index) => (
                <div
                  key={index}
                  className="grid gap-2 items-center"
                  style={{ gridTemplateColumns: "1fr 90px 90px 32px" }}
                >
                  <input
                    className="input"
                    placeholder="e.g. 50 ml"
                    required
                    value={row.label}
                    onChange={(e) =>
                      updateSizeRow(index, "label", e.target.value)
                    }
                  />
                  <input
                    className="input"
                    type="number"
                    min="0"
                    placeholder="MRP"
                    required
                    value={row.price}
                    onChange={(e) =>
                      updateSizeRow(index, "price", e.target.value)
                    }
                  />
                  <input
                    className="input"
                    type="number"
                    min="0"
                    placeholder="Offer"
                    value={row.discountPrice}
                    onChange={(e) =>
                      updateSizeRow(index, "discountPrice", e.target.value)
                    }
                  />
                  {sizeRows.length > 1 ? (
                    <button
                      type="button"
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                      onClick={() => removeSizeRow(index)}
                      aria-label="Remove size"
                    >
                      <X size={16} />
                    </button>
                  ) : (
                    <span />
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs text-stone-400 mt-1">
              Leave &quot;Offer&quot; empty or 0 for no discount on that size.
            </p>
          </div>

          {/* Stock & Category */}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Stock
              <input
                className="input mt-1"
                type="number"
                min="0"
                required
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
            </label>
            <label className="text-sm font-semibold">
              Category
              <select
                className="input mt-1"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                {categories
                  .filter((item) => item !== "All")
                  .map((item) => (
                    <option key={item}>{item}</option>
                  ))}
              </select>
            </label>
          </div>

          {/* Image URL */}
          <label className="text-sm font-semibold">
            Image URL
            <input
              className="input mt-1"
              required
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />
          </label>

          {/* Checkboxes */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              Featured on homepage
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={form.newArrival}
                onChange={(e) =>
                  setForm({ ...form, newArrival: e.target.checked })
                }
              />
              New Arrival
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button type="submit" className="btn-primary" disabled={saving}>
              <Plus size={17} />
              {saving ? "Saving..." : editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setEditingId("");
                  setForm(emptyProduct);
                  setSizeRows([{ ...emptySize }]);
                }}
              >
                Cancel
              </button>
            )}
          </div>

          {message && <p className="text-sm text-stone-600">{message}</p>}
        </div>
      </form>

      {/* ═══ Product List ═══ */}
      <div>
        <h2 className="font-display text-3xl font-bold tracking-normal">
          Products
        </h2>
        <div className="mt-5 grid gap-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="flex gap-4 rounded-lg border border-stone-200 bg-white p-3"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-24 w-24 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold">
                      {product.name}
                      {product.newArrival && (
                        <span className="ml-2 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                          NEW
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-stone-600">
                      {product.category} ·{" "}
                      {product.discountPrice > 0 && product.discountPrice < product.price ? (
                        <>
                          <span className="line-through text-stone-400">
                            {formatCurrency(product.price)}
                          </span>{" "}
                          <span className="text-green-700 font-medium">
                            {formatCurrency(product.discountPrice)}
                          </span>
                        </>
                      ) : (
                        formatCurrency(product.price)
                      )}
                    </p>
                    {product.sizes && product.sizes.length > 1 && (
                      <p className="text-xs text-stone-400 mt-0.5">
                        {product.sizes.length} sizes:{" "}
                        {product.sizes.map((s) => s.label).join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="btn-secondary px-3"
                      onClick={() => startEdit(product)}
                      aria-label="Edit product"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn-secondary px-3 text-red-700"
                      onClick={() => removeProduct(product.id)}
                      aria-label="Delete product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-stone-600">
                  {product.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
