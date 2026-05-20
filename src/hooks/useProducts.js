import { useEffect, useState } from "react";
import { getProducts } from "../firebase/products.js";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getProducts()
      .then((items) => {
        if (active) setProducts(items);
      })
      .catch((err) => {
        if (active) setError(err.message || "Unable to load products.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { products, setProducts, loading, error };
}
