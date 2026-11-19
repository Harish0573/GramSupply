import {
  SprayCan,
  Lightbulb,
  Cctv,
  Monitor,
  Droplets,
  Armchair,
  Trees,
  Building2,
  SunMedium,
} from "lucide-react";
import { art } from "./art";

const categories = [
  { id: 1, name: "Cleaning & Sanitation", icon: SprayCan, image: art("🧹", "#0ea5e9", "#0369a1") },
  { id: 2, name: "Street & Outdoor Lighting", icon: Lightbulb, image: art("💡", "#38bdf8", "#1e3a8a") },
  { id: 3, name: "CCTV & Security", icon: Cctv, image: art("📹", "#64748b", "#0f172a") },
  { id: 4, name: "Computers & Office Technology", icon: Monitor, image: art("🖥️", "#6366f1", "#1e1b4b") },
  { id: 5, name: "Water Systems", icon: Droplets, image: art("🚰", "#22d3ee", "#0e7490") },
  { id: 6, name: "Furniture", icon: Armchair, image: art("🪑", "#f59e0b", "#92400e") },
  { id: 7, name: "Playground & Open Gym", icon: Trees, image: art("🛝", "#34d399", "#047857") },
  { id: 8, name: "Village Infrastructure", icon: Building2, image: art("🏗️", "#a3a3a3", "#404040") },
  { id: 9, name: "Power, Solar & Safety", icon: SunMedium, image: art("☀️", "#fbbf24", "#b45309") },
];

export default categories;
