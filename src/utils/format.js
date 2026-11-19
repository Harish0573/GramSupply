import categories from "../data/categories";

// ---------- money ----------
export const rupees = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

// the backend is the source of truth: a product can be bought only when it has a price above zero
export const hasPrice = (p) => Number(p?.price) > 0;

// a discount is shown ONLY when the backend sends an M.R.P. higher than the price
export function discountOf(p) {
  const price = Number(p?.price);
  const mrp = Number(p?.mrp);
  if (price > 0 && mrp > price) {
    return { mrp, percent: Math.round(((mrp - price) * 100) / mrp) };
  }
  return null;
}

// ---------- images ----------
export const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'>
      <rect width='600' height='450' fill='#f1ecd9'/>
      <g fill='none' stroke='#668b52' stroke-width='3' stroke-linecap='round' opacity='.7'>
        <path d='M300 300c-40-40-30-100 20-130 40 40 30 100-20 130z'/><path d='M300 300V190'/>
      </g>
      <text x='300' y='350' text-anchor='middle' font-family='sans-serif' font-size='22' fill='#646d67'>Photo not available</text>
    </svg>`,
  );

export const categoryImage = (name) =>
  categories.find((c) => c.name === name)?.image || null;

// ---------- product data ----------
const num = (v) => (v === null || v === undefined || v === "" ? null : Number(v));

// make any product from the API look the same everywhere in the app
export function normalizeProduct(raw) {
  const specs = raw.specifications ?? raw.specs ?? null;
  return {
    id: Number(raw.id),
    name: raw.name || "Unnamed product",
    description: raw.description || "",
    image: raw.imageUrl || raw.image || null,
    gallery: Array.isArray(raw.gallery) ? raw.gallery.filter(Boolean) : [],
    price: Number(raw.price) > 0 ? Number(raw.price) : null,
    mrp: num(raw.mrp),
    category: raw.categoryName || raw.category || "",
    categoryId: raw.categoryId ?? null,
    brand: raw.brand || "",
    model: raw.model || "",
    stock: num(raw.stock),
    moq: num(raw.moq ?? raw.minOrderQuantity),
    supplier: raw.supplier || raw.manufacturer || raw.supplierName || "",
    material: raw.material || "",
    dimensions: raw.dimensions || "",
    warranty: raw.warranty || "",
    deliveryInfo: raw.deliveryInfo || "",
    returnPolicy: raw.returnPolicy || "",
    highlights: raw.highlights || "",
    specifications: specs,
    ratingAverage: num(raw.ratingAverage),
    ratingCount: num(raw.ratingCount),
    createdAt: raw.createdAt || null,
    active: raw.active !== false,
  };
}

// Never show one product twice.
// 1) same id -> keep one.  2) the database holds the same product under two ids
// (same name, category and price) -> keep the oldest id and hide the copies.
export function dedupeProducts(list) {
  const byId = new Map();
  list.forEach((p) => {
    if (!byId.has(p.id)) byId.set(p.id, p);
  });
  const seen = new Map();
  const items = [];
  const hidden = [];
  [...byId.values()]
    .sort((a, b) => a.id - b.id)
    .forEach((p) => {
      const key = `${p.name.trim().toLowerCase()}|${p.category}|${p.price}`;
      if (seen.has(key)) hidden.push(p.id);
      else {
        seen.set(key, p.id);
        items.push(p);
      }
    });
  return { items, hidden };
}

// "Material: Steel" lines (or an object, or a list of {name, value}) become [[name, value], ...]
export function parseSpecs(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .map((r) => (typeof r === "string" ? r.split(/:(.+)/) : [r.name || r.key, r.value]))
      .filter((r) => r[0] && r[1])
      .map((r) => [String(r[0]).trim(), String(r[1]).trim()]);
  }
  if (typeof raw === "object") return Object.entries(raw).map(([k, v]) => [k, String(v)]);
  return String(raw)
    .split(/\r?\n|;/)
    .map((l) => l.split(/:(.+)/))
    .filter((r) => r[1])
    .map((r) => [r[0].trim(), r[1].trim()]);
}

export const splitLines = (text) =>
  String(text || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

// ---------- photo variety ----------
// Products in one category often share one photo. These two helpers keep them from looking identical.

// Orders products so categories take turns (A, B, C, A, B, C ...). The same photo
// then comes back only after a complete round of all the other photos.
export function interleaveByCategory(list) {
  const groups = new Map();
  [...list]
    .sort((a, b) => a.id - b.id)
    .forEach((p) => {
      const key = p.categoryId ?? p.category;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(p);
    });
  const lanes = [...groups.values()];
  const out = [];
  for (let i = 0; lanes.some((g) => i < g.length); i += 1) {
    lanes.forEach((g) => {
      if (i < g.length) out.push(g[i]);
    });
  }
  return out;
}

// A different crop of the photo for each product id, so two products that share one
// photo show different parts of it. (Real product photos are still the best fix.)
const CROPS = [
  { objectPosition: "50% 50%" },
  { objectPosition: "12% 50%", transform: "scale(1.15)", transformOrigin: "12% 50%" },
  { objectPosition: "88% 50%", transform: "scale(1.15)", transformOrigin: "88% 50%" },
  { objectPosition: "50% 30%", transform: "scale(1.3)", transformOrigin: "50% 30%" },
  { objectPosition: "25% 60%", transform: "scale(1.22)", transformOrigin: "25% 60%" },
  { objectPosition: "75% 40%", transform: "scale(1.22)", transformOrigin: "75% 40%" },
];
export const imageCrop = (id) => CROPS[Math.abs(Number(id) || 0) % CROPS.length];
