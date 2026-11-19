import api from "../api/axiosConfig";

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

export const isWished = (id) => {
  return getWishlist().some((w) => String(w.id) === String(id));
};

const customer = () => {
  try {
    return JSON.parse(localStorage.getItem("jr_user_info") || "null");
  } catch {
    return null;
  }
};

const push = (item, saved, who) => {
  const c = who || customer();
  if (!c?.customerId || String(item.id).startsWith("demo")) {
    return Promise.resolve();
  }
  return api.post("/wishlist", {
    customerId: c.customerId,
    customerName: c.name,
    phone: c.phone,
    productId: Number(item.id),
    productName: item.name,
    price: item.price ?? null,
    image: item.image && !item.image.startsWith("data:") ? item.image : null,
    saved
  }).catch((error) => {
    console.error("Wishlist API error:", error);
  });
};

export function toggleWishlist(item) {
  const list = getWishlist();
  const has = list.some((w) => String(w.id) === String(item.id));
  if (has) {
    save(list.filter((w) => String(w.id) !== String(item.id)));
  } else {
    save([...list, { ...item, savedAt: new Date().toISOString() }]);
  }
  push(item, !has);
  return !has;
}

export const clearWishlist = () => {
  getWishlist().forEach((w) => {
    push(w, false);
  });
  save([]);
};

export function syncWishlist(user) {
  const c = user ? { customerId: user.customerId, name: user.name, phone: user.phone } : customer();
  if (!c?.customerId || sessionStorage.getItem("gs_wl_synced") === String(c.customerId)) {
    return;
  }
  sessionStorage.setItem("gs_wl_synced", String(c.customerId));
  getWishlist().forEach((w) => {
    push(w, true, c);
  });
}