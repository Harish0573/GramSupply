// "Recently viewed" products, kept on this device
const KEY = "gs_recent";
const MAX = 12;

export const getRecent = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};

export function pushRecent(id) {
  const next = [Number(id), ...getRecent().filter((x) => Number(x) !== Number(id))].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(next));
}
