import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../firebase/orders.js";
import { formatCurrency, formatDate } from "../../utils/format.js";

const statuses = ["pending", "confirmed", "shipped"];

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
    setOrders((items) => items.map((order) => (order.id === orderId ? { ...order, status } : order)));
  }

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-saffron">Orders</p>
          <h1 className="font-display text-4xl font-bold tracking-normal">Incoming orders</h1>
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
            <article key={order.id} className="rounded-lg border border-stone-200 bg-white p-5">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <h2 className="text-lg font-bold">{order.customerName}</h2>
                  <p className="text-sm text-stone-600">{order.customerPhone}</p>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">{order.address}</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="font-bold text-rosewood">{formatCurrency(order.totalAmount)}</p>
                  <p className="text-xs text-stone-500">{formatDate(order.createdAt)}</p>
                </div>
              </div>
              <div className="mt-4 rounded-md bg-stone-50 p-3">
                {(order.items || []).map((item) => (
                  <p key={`${order.id}-${item.productId}`} className="text-sm">
                    {item.name} x {item.qty} · {formatCurrency(item.price * item.qty)}
                  </p>
                ))}
              </div>
              <label className="mt-4 block max-w-xs text-sm font-semibold">
                Status
                <select className="input mt-1" value={order.status} onChange={(event) => changeStatus(order.id, event.target.value)}>
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </label>
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
