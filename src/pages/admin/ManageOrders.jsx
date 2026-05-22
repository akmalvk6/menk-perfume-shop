import { MessageCircle, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../firebase/orders.js";
import { formatCurrency, formatDate } from "../../utils/format.js";

const statuses = ["pending", "confirmed", "shipped", "delivered"];

/* ── Status-specific WhatsApp message templates ── */
const statusMessages = {
  confirmed: (order) =>
    `Assalamu alaikum ${order.customerName},\n\n` +
    `Your order from *Menk.in* has been *confirmed*! ✅\n\n` +
    `📦 Order Details:\n` +
    (order.items || [])
      .map(
        (i) =>
          `• ${i.name}${i.size ? ` (${i.size})` : ""} × ${i.qty} — ${formatCurrency(i.price * i.qty)}`,
      )
      .join("\n") +
    `\n\n💰 Total: *${formatCurrency(order.totalAmount)}*\n` +
    `📍 Delivery to: ${order.address}\n\n` +
    `We'll notify you once it's shipped. JazakAllah khair for choosing Menk! 🌹`,

  shipped: (order) =>
    `Assalamu alaikum ${order.customerName},\n\n` +
    `Great news! Your order from *Menk.in* has been *shipped*! 🚚\n\n` +
    `📦 Order Details:\n` +
    (order.items || [])
      .map(
        (i) =>
          `• ${i.name}${i.size ? ` (${i.size})` : ""} × ${i.qty}`,
      )
      .join("\n") +
    `\n\n💰 Total: *${formatCurrency(order.totalAmount)}*\n` +
    `📍 Delivering to: ${order.address}\n\n` +
    `You'll receive it soon, In Sha Allah! 📬`,

  delivered: (order) =>
    `Assalamu alaikum ${order.customerName},\n\n` +
    `Your order from *Menk.in* has been *delivered*! 🎉\n\n` +
    `We hope you love your fragrance! If you have any questions or feedback, feel free to reach out.\n\n` +
    `JazakAllah khair for shopping with Menk! 🌹`,
};

const statusColors = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
};

function getWhatsAppNumber(phone) {
  if (!phone) return "";
  return phone.replace(/\D/g, "");
}

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    setLoading(true);
    setOrders(await getOrders());
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function changeStatus(orderId, status) {
    await updateOrderStatus(orderId, status);
    setOrders((items) =>
      items.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    );
  }

  function notifyCustomer(order) {
    const template = statusMessages[order.status];
    if (!template) return;

    const message = template(order);
    const phone = getWhatsAppNumber(order.customerPhone);
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-saffron">
            Orders
          </p>
          <h1 className="font-display text-4xl font-bold tracking-normal">
            Incoming orders
          </h1>
        </div>
        <button type="button" className="btn-secondary" onClick={loadOrders}>
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="mt-8 text-stone-600">Loading orders...</p>
      ) : (
        <div className="mt-8 grid gap-4">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-lg border border-stone-200 bg-white p-5"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold">{order.customerName}</h2>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusColors[order.status] || "bg-stone-50 text-stone-600 border-stone-200"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-stone-600">
                    {order.customerPhone}
                  </p>
                  {order.customerEmail && (
                    <p className="text-sm text-stone-600">
                      {order.customerEmail}
                    </p>
                  )}
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                    {order.address}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="font-bold text-rosewood">
                    {formatCurrency(order.totalAmount)}
                  </p>
                  <p className="text-xs text-stone-500">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>

              {/* Order items */}
              <div className="mt-4 rounded-md bg-stone-50 p-3">
                {(order.items || []).map((item, idx) => (
                  <p key={`${order.id}-${idx}`} className="text-sm">
                    {item.name}
                    {item.size ? ` (${item.size})` : ""} x {item.qty} ·{" "}
                    {formatCurrency(item.price * item.qty)}
                  </p>
                ))}
              </div>

              {/* Status + Notify */}
              <div className="mt-4 flex flex-wrap items-end gap-3">
                <label className="text-sm font-semibold max-w-xs flex-1">
                  Status
                  <select
                    className="input mt-1"
                    value={order.status}
                    onChange={(e) => changeStatus(order.id, e.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </label>

                {order.status !== "pending" && (
                  <button
                    type="button"
                    className="btn-primary gap-2 text-sm"
                    onClick={() => notifyCustomer(order)}
                  >
                    <MessageCircle size={16} />
                    Notify Customer
                  </button>
                )}
              </div>
            </article>
          ))}

          {orders.length === 0 && (
            <p className="rounded-lg border border-stone-200 bg-white p-6 text-stone-600">
              No orders yet.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
