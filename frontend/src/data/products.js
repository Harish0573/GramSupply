import { art } from "./art";

// Fields: id, name, category (must match a category name), price, mrp, rating, reviews, badge, desc, image
const products = [
  { id: 101, name: "Heavy Duty Dustbin 120L", category: "Cleaning & Sanitation", price: 3499, mrp: 4299, rating: 4.5, reviews: 212, badge: "Best seller", desc: "Wheeled 120 litre dustbin with lid, UV stabilised plastic for outdoor use.", image: art("🗑️", "#0ea5e9", "#0369a1") },
  { id: 102, name: "Floor Cleaning Machine", category: "Cleaning & Sanitation", price: 18999, mrp: 22999, rating: 4.3, reviews: 64, badge: "", desc: "Single disc scrubber for schools, halls and offices.", image: art("🧼", "#38bdf8", "#075985") },
  { id: 201, name: "Solar Street Light 60W", category: "Street & Outdoor Lighting", price: 6999, mrp: 8999, rating: 4.6, reviews: 318, badge: "Top rated", desc: "All-in-one solar LED street light with motion sensor and 12 hr backup.", image: art("💡", "#38bdf8", "#1e3a8a") },
  { id: 202, name: "LED Flood Light 100W", category: "Street & Outdoor Lighting", price: 1799, mrp: 2499, rating: 4.4, reviews: 140, badge: "", desc: "IP66 weatherproof flood light for grounds and compounds.", image: art("🔦", "#60a5fa", "#1e40af") },
  { id: 301, name: "Bullet CCTV Camera 4MP", category: "CCTV & Security", price: 2799, mrp: 3599, rating: 4.5, reviews: 521, badge: "Best seller", desc: "4MP night vision outdoor bullet camera, metal body.", image: art("📹", "#64748b", "#0f172a") },
  { id: 302, name: "8-Channel NVR Kit", category: "CCTV & Security", price: 21999, mrp: 26999, rating: 4.4, reviews: 87, badge: "", desc: "8 camera kit with NVR and 2TB storage for institutions.", image: art("📼", "#475569", "#020617") },
  { id: 401, name: "Desktop Computer i5", category: "Computers & Office Technology", price: 38999, mrp: 44999, rating: 4.2, reviews: 96, badge: "", desc: "Core i5, 16GB RAM, 512GB SSD with 22 inch monitor.", image: art("🖥️", "#6366f1", "#1e1b4b") },
  { id: 402, name: "Laser Printer A4", category: "Computers & Office Technology", price: 9499, mrp: 11999, rating: 4.3, reviews: 203, badge: "New", desc: "Fast mono laser printer with wifi and duplex.", image: art("🖨️", "#818cf8", "#312e81") },
  { id: 501, name: "RO Water Plant 500 LPH", category: "Water Systems", price: 84999, mrp: 99999, rating: 4.6, reviews: 41, badge: "Top rated", desc: "Commercial RO plant for villages and schools with UV and TDS control.", image: art("🚰", "#22d3ee", "#0e7490") },
  { id: 502, name: "Water Cooler 80L", category: "Water Systems", price: 24999, mrp: 28999, rating: 4.4, reviews: 77, badge: "", desc: "Stainless steel water cooler with purifier, 80 litre.", image: art("🥤", "#2dd4bf", "#115e59") },
  { id: 601, name: "Ergonomic Office Chair", category: "Furniture", price: 5499, mrp: 7499, rating: 4.5, reviews: 389, badge: "Best seller", desc: "High-back mesh chair with lumbar support.", image: art("🪑", "#f59e0b", "#92400e") },
  { id: 602, name: "Student Bench Desk Set", category: "Furniture", price: 3299, mrp: 3999, rating: 4.3, reviews: 154, badge: "Bulk deal", desc: "Two-seater steel and wood classroom bench with desk.", image: art("🏫", "#fb923c", "#9a3412") },
  { id: 701, name: "Playground Swing Set", category: "Playground & Open Gym", price: 28999, mrp: 34999, rating: 4.7, reviews: 52, badge: "Top rated", desc: "Galvanised steel 4-seat swing set, safety tested.", image: art("🛝", "#34d399", "#047857") },
  { id: 702, name: "Open Gym 6-Station Set", category: "Playground & Open Gym", price: 64999, mrp: 74999, rating: 4.4, reviews: 33, badge: "", desc: "Outdoor fitness equipment for parks and panchayat grounds.", image: art("🏋️", "#4ade80", "#166534") },
  { id: 801, name: "Paver Blocks (per sq ft)", category: "Village Infrastructure", price: 62, mrp: 75, rating: 4.2, reviews: 120, badge: "Bulk deal", desc: "Interlocking concrete paver blocks for roads and courtyards.", image: art("🧱", "#a3a3a3", "#404040") },
  { id: 802, name: "Stainless Steel Railing", category: "Village Infrastructure", price: 1499, mrp: 1899, rating: 4.3, reviews: 48, badge: "", desc: "SS 304 railing, price per running metre.", image: art("🚧", "#9ca3af", "#374151") },
  { id: 901, name: "Solar Panel 540W", category: "Power, Solar & Safety", price: 14999, mrp: 17999, rating: 4.6, reviews: 175, badge: "Best seller", desc: "Mono PERC panel with 25 year performance warranty.", image: art("☀️", "#fbbf24", "#b45309") },
  { id: 902, name: "Fire Extinguisher 6kg", category: "Power, Solar & Safety", price: 2199, mrp: 2799, rating: 4.5, reviews: 301, badge: "", desc: "ABC dry powder extinguisher, ISI marked.", image: art("🧯", "#f87171", "#991b1b") },
];

export default products;
