
import api from "../api/axiosConfig";

const KEY = "jr_wishlist";

// 1. Get wishlist from localStorage
export const getWishlist = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};

// 2. Save wishlist and notify other components
const save = (list) => {
  localStorage.setItem(KEY, JSON.stringify(list));

  window.dispatchEvent(
    new Event("wishlist-updated")
  );
};

// 3. Check whether a product is in wishlist
export const isWished = (id) => {
  return getWishlist().some(
    (w) => String(w.id) === String(id)
  );
};

// 4. Get logged-in customer information
const customer = () => {
  try {
    return JSON.parse(
      localStorage.getItem("jr_user_info") || "null"
    );
  } catch {
    return null;
  }
};

// 5. Send wishlist information to Spring Boot backend
const push = (item, saved, who) => {
  const c = who || customer();

  if (
    !c?.customerId ||
    String(item.id).startsWith("demo")
  ) {
    return Promise.resolve();
  }

  return api.post("/wishlist", {
    customerId: c.customerId,
    customerName: c.name,
    phone: c.phone,
    productId: Number(item.id),
    productName: item.name,
    price: item.price ?? null,
    image:
      item.image && !item.image.startsWith("data:")
        ? item.image
        : null,
    saved
  }).catch((error) => {
    console.error("Wishlist API error:", error);
  });
};

// 6. Add or remove product from wishlist
export function toggleWishlist(item) {
  const list = getWishlist();

  const has = list.some(
    (w) => String(w.id) === String(item.id)
  );

  if (has) {
    save(
      list.filter(
        (w) => String(w.id) !== String(item.id)
      )
    );
  } else {
    save([
      ...list,
      {
        ...item,
        savedAt: new Date().toISOString()
      }
    ]);
  }

  push(item, !has);

  return !has;
}

// 7. Clear complete wishlist
export const clearWishlist = () => {
  getWishlist().forEach((w) => {
    push(w, false);
  });

  save([]);
};

// 8. Synchronize wishlist with logged-in customer
export function syncWishlist(user) {
  const c = user
    ? {
        customerId: user.customerId,
        name: user.name,
        phone: user.phone
      }
    : customer();

  if (
    !c?.customerId ||
    sessionStorage.getItem("gs_wl_synced") ===
      String(c.customerId)
  ) {
    return;
  }

  sessionStorage.setItem(
    "gs_wl_synced",
    String(c.customerId)
  );

  getWishlist().forEach((w) => {
    push(w, true, c);
  });
}
