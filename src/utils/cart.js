// The cart lives in localStorage under "jr_cart" as [{ productId, quantity }].
// "Buy now" uses "jr_buynow" with the same shape. Both keys are unchanged from before.
const CART_KEY = "jr_cart";
const BUY_KEY = "jr_buynow";
const MAX_QTY = 999;

// one line per product: the same product twice is added together
function mergeLines(lines) {
  const map = new Map();
  lines.forEach((l) => {
    const id = Number(l?.productId);
    if (!Number.isFinite(id)) return;
    const qty = Math.max(1, Number(l.quantity) || 1);
    map.set(id, Math.min(MAX_QTY, (map.get(id) || 0) + qty));
  });
  return [...map].map(([productId, quantity]) => ({ productId, quantity }));
}

export function readCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return mergeLines(Array.isArray(raw) ? raw : []);
  } catch {
    return [];
  }
}

export function writeCart(lines) {
  localStorage.setItem(CART_KEY, JSON.stringify(mergeLines(lines)));
  window.dispatchEvent(new Event("cart-updated")); // the header count listens for this
}

export function addToCart(productId, quantity = 1) {
  writeCart([...readCart(), { productId, quantity }]);
}

export const cartCount = () => readCart().reduce((sum, l) => sum + l.quantity, 0);

export function setBuyNow(productId, quantity = 1) {
  localStorage.setItem(
    BUY_KEY,
    JSON.stringify([{ productId: Number(productId), quantity: Math.max(1, Number(quantity) || 1) }]),
  );
}
