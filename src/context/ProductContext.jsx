import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { KEYS, readStorage, writeStorage } from "../utils/storage.js";
import { seedProducts, seedActivity } from "../utils/seed.js";

const ProductContext = createContext(null);

const MAX_ACTIVITY = 30;

export function ProductProvider({ children }) {
  // First visit: demo data. After that: whatever the user saved
  const [products, setProducts] = useState(() => readStorage(KEYS.products, null) ?? seedProducts);
  const [activity, setActivity] = useState(() => readStorage(KEYS.activity, null) ?? seedActivity);

  // Persist to localStorage whenever products or activity change
  useEffect(() => writeStorage(KEYS.products, products), [products]);
  useEffect(() => writeStorage(KEYS.activity, activity), [activity]);

  const log = useCallback((type, text) => {
    const entry = { id: `a${Date.now()}${Math.random().toString(36).slice(2, 6)}`, type, text, at: new Date().toISOString() };
    setActivity((list) => [entry, ...list].slice(0, MAX_ACTIVITY));
  }, []);

  const addProduct = useCallback(
    (data) => {
      const now = new Date().toISOString();
      const product = { ...data, id: `p${Date.now()}`, createdAt: now, updatedAt: now };
      setProducts((list) => [product, ...list]);
      log("add", `Added ${product.name}`);
      return product;
    },
    [log]
  );

  const updateProduct = useCallback(
    (id, data) => {
      setProducts((list) => list.map((p) => (p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p)));
      log("update", `Updated ${data.name}`);
    },
    [log]
  );

  const deleteProduct = useCallback(
    (id) => {
      const target = products.find((p) => p.id === id);
      setProducts((list) => list.filter((p) => p.id !== id));
      if (target) log("delete", `Deleted ${target.name}`);
    },
    [products, log]
  );

  const value = useMemo(
    () => ({ products, activity, addProduct, updateProduct, deleteProduct }),
    [products, activity, addProduct, updateProduct, deleteProduct]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductProvider");
  return ctx;
}
