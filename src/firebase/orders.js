import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, hasFirebaseConfig, withTimeout } from "./config.js";

/* ─── Local storage (used when Firebase is not configured) ─── */

const LOCAL_KEY = "menk_orders";

function getLocalOrders() {
  try {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* corrupt */
  }
  return [];
}

function saveLocalOrders(orders) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(orders));
}

/* ─── Firestore ref ─── */

const ordersCollection = () => collection(db, "orders");

/* ─── CRUD ─── */

export async function createOrder(order) {
  const payload = {
    ...order,
    totalAmount: Number(order.totalAmount),
    status: "pending",
    whatsappSent: true,
    createdAt: new Date().toISOString(),
  };

  if (!hasFirebaseConfig) {
    const id = `order-${Date.now()}`;
    const locals = getLocalOrders();
    locals.unshift({ ...payload, id });
    saveLocalOrders(locals);
    return id;
  }

  payload.createdAt = serverTimestamp();
  const created = await withTimeout(addDoc(ordersCollection(), payload));
  return created.id;
}

export async function getOrders() {
  if (!hasFirebaseConfig) {
    return getLocalOrders();
  }

  try {
    const snapshot = await withTimeout(
      getDocs(query(ordersCollection(), orderBy("createdAt", "desc"))),
    );
    return snapshot.docs.map((orderDoc) => ({
      id: orderDoc.id,
      ...orderDoc.data(),
    }));
  } catch {
    return [];
  }
}

export async function updateOrderStatus(orderId, status) {
  if (!hasFirebaseConfig) {
    const locals = getLocalOrders();
    const idx = locals.findIndex((o) => o.id === orderId);
    if (idx !== -1) {
      locals[idx] = { ...locals[idx], status };
      saveLocalOrders(locals);
    }
    return;
  }

  await withTimeout(updateDoc(doc(db, "orders", orderId), { status }));
}
