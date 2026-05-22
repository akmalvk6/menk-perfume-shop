import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "menk_cart";

function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* corrupt */
  }
  return [];
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  /* Persist to localStorage on every change */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  /* ── Add item (or increment qty if same product + size) ── */
  const addItem = useCallback((item) => {
    setItems((prev) => {
      const key = `${item.productId}__${item.size}`;
      const idx = prev.findIndex(
        (i) => `${i.productId}__${i.size}` === key,
      );
      if (idx !== -1) {
        return prev.map((i, index) =>
          index === idx ? { ...i, qty: i.qty + item.qty } : i,
        );
      }
      return [...prev, { ...item }];
    });
  }, []);

  /* ── Remove a specific product + size ── */
  const removeItem = useCallback((productId, size) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size)),
    );
  }, []);

  /* ── Update quantity ── */
  const updateQty = useCallback((productId, size, qty) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.size === size ? { ...i, qty } : i,
      ),
    );
  }, []);

  /* ── Clear cart ── */
  const clearCart = useCallback(() => setItems([]), []);

  /* ── Derived values ── */
  const cartCount = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items],
  );

  const cartTotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      cartCount,
      cartTotal,
    }),
    [items, addItem, removeItem, updateQty, clearCart, cartCount, cartTotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
