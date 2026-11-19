// The wishlist is kept in localStorage under "jr_wishlist" (same key and item shape as before).
// The current backend has no wishlist endpoint, so nothing is sent to the server.
const KEY = "jr_wishlist";

export const getWishlist = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};

const save = (list) => {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("wishlist-updated"));
};

export const isWished = (id) => getWishlist().some((w) => String(w.id) === String(id));

// add when missing, remove when present. returns true when the product is now saved
export function toggleWishlist(item) {
  const list = getWishlist();
  const has = list.some((w) => String(w.id) === String(item.id));
  save(
    has
      ? list.filter((w) => String(w.id) !== String(item.id))
      : [...list, { ...item, savedAt: new Date().toISOString() }],
  );
  return !has;
}

export const clearWishlist = () => save([]);
