import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { fallbackProducts } from "../data/fallbackProducts.js";
import { db, hasFirebaseConfig } from "./config.js";

const productsCollection = () => collection(db, "products");

export async function getProducts() {
  if (!hasFirebaseConfig) return fallbackProducts;

  const snapshot = await getDocs(query(productsCollection(), orderBy("createdAt", "desc")));
  const products = snapshot.docs.map((productDoc) => ({
    id: productDoc.id,
    ...productDoc.data(),
  }));

  return products.length ? products : fallbackProducts;
}

export async function getFeaturedProducts() {
  const products = await getProducts();
  return products.filter((product) => product.featured).slice(0, 6);
}

export async function getProduct(productId) {
  if (!hasFirebaseConfig) {
    return fallbackProducts.find((product) => product.id === productId) ?? null;
  }

  const productDoc = await getDoc(doc(db, "products", productId));
  return productDoc.exists() ? { id: productDoc.id, ...productDoc.data() } : null;
}

export async function createProduct(product) {
  const payload = {
    ...product,
    price: Number(product.price),
    stock: Number(product.stock),
    featured: Boolean(product.featured),
    createdAt: serverTimestamp(),
  };

  const created = await addDoc(productsCollection(), payload);
  return created.id;
}

export async function updateProduct(productId, product) {
  const payload = {
    ...product,
    price: Number(product.price),
    stock: Number(product.stock),
    featured: Boolean(product.featured),
  };

  await updateDoc(doc(db, "products", productId), payload);
}

export async function deleteProduct(productId) {
  await deleteDoc(doc(db, "products", productId));
}
