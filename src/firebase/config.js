import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/**
 * Detect placeholder values like "your-api-key", "your-project-id", etc.
 * These cause Firestore to hang indefinitely trying to connect.
 */
function isRealValue(value) {
  if (!value || typeof value !== "string") return false;
  const v = value.trim().toLowerCase();
  if (v.startsWith("your")) return false;
  if (v.includes("your-")) return false;
  if (v.includes("xxx")) return false;
  if (v.length < 6) return false;
  return true;
}

export const hasFirebaseConfig = Boolean(
  isRealValue(firebaseConfig.apiKey) &&
    isRealValue(firebaseConfig.projectId) &&
    isRealValue(firebaseConfig.appId),
);

export const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app) : null;

/**
 * Race a Firestore promise against a timeout.
 * Prevents the app from hanging when Firebase is misconfigured or network is slow.
 */
export function withTimeout(promise, ms = 6000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Firebase request timed out")), ms),
    ),
  ]);
}
