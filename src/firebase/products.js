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
import { db, hasFirebaseConfig, withTimeout } from "./config.js";

/* ─── In-memory cache ─── */

let _cache = null;
let _cacheTs = 0;
const CACHE_TTL = 60_000;

function setCache(products) {
  _cache = products;
  _cacheTs = Date.now();
  return products;
}

export function invalidateProductsCache() {
  _cache = null;
  _cacheTs = 0;
}

/* ─── Local storage (used when Firebase is not configured) ─── */

const LOCAL_KEY = "menk_products";

function getLocalProducts() {
  try {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // corrupt data — reset
  }
  // Seed with fallback products
  const seeded = fallbackProducts.map((p) => ({
    ...p,
    createdAt: new Date().toISOString(),
  }));
  localStorage.setItem(LOCAL_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveLocalProducts(products) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(products));
  setCache(products);
}

/* ─── Reads ─── */

const productsCollection = () => collection(db, "products");

export async function getProducts(forceRefresh = false) {
  if (!forceRefresh && _cache && Date.now() - _cacheTs < CACHE_TTL) {
    return _cache;
  }

  if (!hasFirebaseConfig) {
    return setCache(getLocalProducts());
  }

  try {
    const snapshot = await withTimeout(
      getDocs(query(productsCollection(), orderBy("createdAt", "desc"))),
    );
    const products = snapshot.docs.map((productDoc) => ({
      id: productDoc.id,
      ...productDoc.data(),
    }));

    return setCache(products.length ? products : fallbackProducts);
  } catch {
    return setCache(_cache || fallbackProducts);
  }
}

export async function getFeaturedProducts() {
  const products = await getProducts();
  return products.filter((product) => product.featured).slice(0, 6);
}

export async function getNewArrivals() {
  const products = await getProducts();
  return products.filter((product) => product.newArrival).slice(0, 6);
}

export async function getProduct(productId) {
  if (!hasFirebaseConfig) {
    const locals = getLocalProducts();
    return locals.find((p) => p.id === productId) ?? null;
  }

  try {
    const productDoc = await withTimeout(
      getDoc(doc(db, "products", productId)),
    );
    if (productDoc.exists()) {
      return { id: productDoc.id, ...productDoc.data() };
    }
  } catch {
    // Firebase error — try fallback
  }

  return fallbackProducts.find((p) => p.id === productId) ?? null;
}

/* ─── Writes ─── */

export async function createProduct(product) {
  const payload = {
    ...product,
    price: Number(product.price),
    discountPrice: Number(product.discountPrice || 0),
    stock: Number(product.stock),
    featured: Boolean(product.featured),
    newArrival: Boolean(product.newArrival),
    sizes: Array.isArray(product.sizes) ? product.sizes : [],
  };

  if (!hasFirebaseConfig) {
    const id = `local-${Date.now()}`;
    const locals = getLocalProducts();
    locals.unshift({ ...payload, id, createdAt: new Date().toISOString() });
    saveLocalProducts(locals);
    return id;
  }

  payload.createdAt = serverTimestamp();
  const created = await withTimeout(addDoc(productsCollection(), payload));
  invalidateProductsCache();
  return created.id;
}

export async function updateProduct(productId, product) {
  const payload = {
    ...product,
    price: Number(product.price),
    discountPrice: Number(product.discountPrice || 0),
    stock: Number(product.stock),
    featured: Boolean(product.featured),
    newArrival: Boolean(product.newArrival),
    sizes: Array.isArray(product.sizes) ? product.sizes : [],
  };

  if (!hasFirebaseConfig) {
    const locals = getLocalProducts();
    const idx = locals.findIndex((p) => p.id === productId);
    if (idx !== -1) {
      locals[idx] = { ...locals[idx], ...payload };
      saveLocalProducts(locals);
    }
    return;
  }

  await withTimeout(updateDoc(doc(db, "products", productId), payload));
  invalidateProductsCache();
}

export async function deleteProduct(productId) {
  if (!hasFirebaseConfig) {
    const locals = getLocalProducts();
    saveLocalProducts(locals.filter((p) => p.id !== productId));
    return;
  }

  await withTimeout(deleteDoc(doc(db, "products", productId)));
  invalidateProductsCache();
}
