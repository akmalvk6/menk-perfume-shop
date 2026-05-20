import { Boxes, ClipboardList, Clock3, IndianRupee } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../firebase/orders.js";
import { getProducts } from "../../firebase/products.js";
import { formatCurrency } from "../../utils/format.js";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Promise.all([getProducts(), getOrders()]).then(([productItems, orderItems]) => {
      setProducts(productItems);
      setOrders(orderItems);
    });
  }, []);

  const totalRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0),
    [orders],
  );
  const pendingOrders = orders.filter((order) => order.status === "pending").length;

  const cards = [
    { label: "Products", value: products.length, icon: Boxes },
    { label: "Orders", value: orders.length, icon: ClipboardList },
    { label: "Pending", value: pendingOrders, icon: Clock3 },
    { label: "Order value", value: formatCurrency(totalRevenue), icon: IndianRupee },
  ];

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-saffron">Overview</p>
          <h1 className="font-display text-4xl font-bold tracking-normal">Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/products" className="btn-secondary">Products</Link>
          <Link to="/admin/orders" className="btn-primary">Orders</Link>
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-lg border border-stone-200 bg-white p-5">
              <Icon className="text-rosewood" size={24} />
              <p className="mt-4 text-sm font-semibold text-stone-500">{card.label}</p>
              <p className="mt-1 text-2xl font-bold">{card.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
