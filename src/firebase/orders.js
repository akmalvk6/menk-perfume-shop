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
import { db, hasFirebaseConfig } from "./config.js";

const ordersCollection = () => collection(db, "orders");

export async function createOrder(order) {
  const payload = {
    ...order,
    totalAmount: Number(order.totalAmount),
    status: "pending",
    whatsappSent: true,
    createdAt: serverTimestamp(),
  };

  if (!hasFirebaseConfig) {
    return `local-${Date.now()}`;
  }

  const created = await addDoc(ordersCollection(), payload);
  return created.id;
}

export async function getOrders() {
  if (!hasFirebaseConfig) return [];

  const snapshot = await getDocs(query(ordersCollection(), orderBy("createdAt", "desc")));
  return snapshot.docs.map((orderDoc) => ({
    id: orderDoc.id,
    ...orderDoc.data(),
  }));
}

export async function updateOrderStatus(orderId, status) {
  await updateDoc(doc(db, "orders", orderId), { status });
}
