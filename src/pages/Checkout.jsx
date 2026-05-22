import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import SlideToConfirm from "../components/SlideToConfirm";
import { useCart } from "../context/CartContext";
import { createOrder } from "../firebase/orders";
import { formatCurrency } from "../utils/format";
import { buildWhatsAppUrl } from "../utils/whatsapp";

/* ─── Country codes ─── */

const countryCodes = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+1", flag: "🇺🇸", name: "US" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
];

function validatePhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function validateEmail(email) {
  if (!email.trim()) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();

  const [form, setForm] = useState({
    customerName: "",
    countryCode: "+91",
    customerPhone: "",
    customerEmail: "",
    address: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [saving, setSaving] = useState(false);
  const [orderUrl, setOrderUrl] = useState("");
  const [message, setMessage] = useState("");

  /* Redirect if cart is empty */
  if (items.length === 0 && !message) {
    return <Navigate to="/cart" replace />;
  }

  const canSubmit =
    form.customerName.trim() !== "" &&
    form.customerPhone.trim() !== "" &&
    validatePhone(form.customerPhone) &&
    validateEmail(form.customerEmail) &&
    form.address.trim() !== "";

  function handlePhoneChange(value) {
    const cleaned = value.replace(/[^\d\s-]/g, "");
    setForm({ ...form, customerPhone: cleaned });
    if (cleaned && !validatePhone(cleaned)) {
      setPhoneError("Enter a valid mobile number (7–15 digits)");
    } else {
      setPhoneError("");
    }
  }

  function handleEmailChange(value) {
    setForm({ ...form, customerEmail: value });
    if (value.trim() && !validateEmail(value)) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }
  }

  async function submitOrder() {
    setSaving(true);
    setMessage("");

    const fullPhone = `${form.countryCode}${form.customerPhone.replace(/\D/g, "")}`;

    const orderItems = items.map((i) => ({
      productId: i.productId,
      name: i.name,
      size: i.size,
      qty: i.qty,
      price: i.price,
    }));

    const order = {
      customerName: form.customerName,
      customerPhone: fullPhone,
      customerEmail: form.customerEmail.trim() || "",
      address: form.address,
      items: orderItems,
      totalAmount: cartTotal,
      status: "pending",
      whatsappSent: true,
      createdAt: new Date(),
    };

    const url = buildWhatsAppUrl(order);

    try {
      await createOrder(order);
      setOrderUrl(url);
      window.open(url, "_blank");
      setMessage("Order placed! Confirm on WhatsApp.");
      clearCart();
    } catch {
      setOrderUrl(url);
      setMessage("Could not save — use the WhatsApp link below.");
    } finally {
      setSaving(false);
    }
  }

  /* ── Order confirmed view ── */
  if (message && items.length === 0) {
    return (
      <div className="pt-28 pb-20">
        <div className="shell max-w-xl text-center py-16">
          <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="font-serif text-3xl text-ink mb-2">{message}</h1>
          <p className="text-ink-light mb-8">
            Your order details have been sent via WhatsApp.
          </p>
          {orderUrl && (
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold mb-4 justify-center"
            >
              Open WhatsApp Manually
            </a>
          )}
          <Link to="/products" className="btn-primary justify-center">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="shell max-w-2xl">
        {/* Back to cart */}
        <AnimatedSection className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-ink-light hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>
        </AnimatedSection>

        <AnimatedSection>
          <span className="badge mb-4">Checkout</span>
          <h1 className="font-serif text-3xl md:text-4xl text-ink font-light mt-4">
            Complete Your Order
          </h1>
          <div className="gold-line mt-4 mx-0" style={{ marginLeft: 0 }} />
        </AnimatedSection>

        <div className="mt-8 space-y-6">
          {/* ── Order Summary ── */}
          <AnimatedSection delay={0.1}>
            <div className="glass-card p-5">
              <h3 className="font-serif text-xl text-ink mb-4">
                Order Summary
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-ink-light">
                      {item.name}{" "}
                      <span className="text-gold">({item.size})</span> × {item.qty}
                    </span>
                    <span className="font-medium text-ink">
                      {formatCurrency(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gold/10">
                <span className="font-medium text-ink">Total</span>
                <span className="font-serif text-2xl text-gold">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* ── Customer Details ── */}
          <AnimatedSection delay={0.2}>
            <div className="glass-card p-5 space-y-4">
              <h3 className="font-serif text-xl text-ink">Your Details</h3>

              {/* Name */}
              <input
                required
                placeholder="Full name *"
                value={form.customerName}
                onChange={(e) =>
                  setForm({ ...form, customerName: e.target.value })
                }
                className="input"
              />

              {/* Phone */}
              <div>
                <div
                  className="grid gap-2"
                  style={{ gridTemplateColumns: "120px 1fr" }}
                >
                  <select
                    value={form.countryCode}
                    onChange={(e) =>
                      setForm({ ...form, countryCode: e.target.value })
                    }
                    className="input"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    placeholder="Mobile number *"
                    value={form.customerPhone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className={`input ${phoneError ? "!border-red-400" : ""}`}
                  />
                </div>
                {phoneError && (
                  <p className="text-xs text-red-500 mt-1">{phoneError}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email address (optional)"
                  value={form.customerEmail}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={`input ${emailError ? "!border-red-400" : ""}`}
                />
                {emailError && (
                  <p className="text-xs text-red-500 mt-1">{emailError}</p>
                )}
              </div>

              {/* Address */}
              <textarea
                required
                rows={2}
                placeholder="Delivery address *"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                className="input resize-none"
              />

              {/* Slide to Confirm */}
              <SlideToConfirm
                onConfirm={submitOrder}
                disabled={!canSubmit}
                loading={saving}
              />

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
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
