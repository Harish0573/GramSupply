import { useCallback, useEffect, useState } from "react";
import api, { errorMessage } from "../api/axiosConfig";
import { dedupeProducts, normalizeProduct } from "../utils/format";

// ONE shared download of GET /products for the whole app, so Home, Products, Cart and
// the product page all read the same data, and so the same price.
let cache = null;
let inflight = null;
const FRESH_MS = 30_000;

export function loadCatalogue(force = false) {
  if (!force && cache && Date.now() - cache.at < FRESH_MS) return Promise.resolve(cache);
  if (!inflight) {
    inflight = api
      .get("/products")
      .then((res) => {
        const rows = Array.isArray(res.data) ? res.data : res.data?.content || [];
        const { items, hidden } = dedupeProducts(rows.map(normalizeProduct).filter((p) => p.active));
        cache = { items, hidden, at: Date.now() };
        return cache;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

let categoriesCache = null;
export function loadCategories() {
  if (categoriesCache) return Promise.resolve(categoriesCache);
  return api.get("/categories").then((res) => {
    categoriesCache = (Array.isArray(res.data) ? res.data : []).filter((c) => c.active !== false);
    return categoriesCache;
  });
}

// products: the de-duplicated list. error: a message to show. reload(): try again.
export default function useCatalogue() {
  const [state, setState] = useState({
    products: cache?.items || [],
    loading: !cache,
    error: "",
  });

  const load = useCallback((force = false) => {
    setState((s) => ({ ...s, loading: true, error: "" }));
    loadCatalogue(force)
      .then((c) => setState({ products: c.items, loading: false, error: "" }))
      .catch((err) =>
        setState({ products: [], loading: false, error: errorMessage(err, "Could not load products.") }),
      );
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  return { ...state, reload: () => load(true) };
}

export function useCategories() {
  const [categories, setCategories] = useState(categoriesCache || []);
  useEffect(() => {
    loadCategories().then(setCategories).catch(() => setCategories([]));
  }, []);
  return categories;
}
