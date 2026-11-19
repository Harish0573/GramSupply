const KEY = "jr_cart";

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function save(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(product, quantity = 1) {
  const items = getCart();
  const found = items.find((i) => i.id === product.id);
  if (found) found.quantity += quantity;
  else
    items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
  save(items);
}

export function setQuantity(id, quantity) {
  const items = getCart()
    .map((i) => (i.id === id ? { ...i, quantity } : i))
    .filter((i) => i.quantity > 0);
  save(items);
}

export function removeFromCart(id) {
  save(getCart().filter((i) => i.id !== id));
}

export function clearCart() {
  save([]);
}

export const formatPrice = (n) => "₹" + Number(n).toLocaleString("en-IN");
