import { useState, useEffect } from "react";
import { API_URL } from "../config";

// A custom hook: a function starting with "use" that itself uses other
// hooks inside it. Any component can call useProducts() and get back
// live data from the backend, instead of every page repeating this logic.
export function useProducts(category) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const url =
      category && category !== "All"
        ? `${API_URL}/api/products?category=${category}`
        : `${API_URL}/api/products`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  return { products, loading, error };
}