import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BadgePercent, ShoppingBag, Truck, ShieldCheck, Zap } from "lucide-react";
import categories from "../data/categories";
import "./DealHero.css";

const campaigns = [
  { eyebrow: "GRAMSUPPLY MEGA SAVINGS", title: "Big deals for", highlight: "better institutions.", detail: "Special prices on selected furniture, security, lighting and essential supplies.", discount: "UP TO 25% OFF", category: "All", image: "/categories/lighting.jpg", cta: "Shop all deals" },
  { eyebrow: "OFFICE UPGRADE DAYS", title: "Refresh your", highlight: "workspace for less.", detail: "Explore value offers on office furniture and computer essentials.", discount: "UP TO 20% OFF", category: "Furniture", image: "/categories/furniture.jpg", cta: "Shop office deals" },
  { eyebrow: "SAFETY & SECURITY SALE", title: "Smarter security.", highlight: "Smarter prices.", detail: "Discover selected CCTV and outdoor lighting offers for your premises.", discount: "UP TO 15% OFF", category: "CCTV & Security", image: "/categories/cctv.jpg", cta: "Explore security" },
];

function DealHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = campaigns[active];
  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % campaigns.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused]);
  const target = current.category === "All" ? "/products" : `/products?category=${encodeURIComponent(current.category)}`;
  return (
    <section className="gs-deal-hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="gs-deal-copy">
        <span className="gs-deal-eyebrow"><Zap size={14}/> {current.eyebrow}</span>
        <div className="gs-deal-offer">{current.discount}</div>
        <h1>{current.title}<br/><em>{current.highlight}</em></h1>
        <p>{current.detail}</p>
        <div className="gs-deal-actions">
          <Link to={target} className="gs-deal-primary">{current.cta} <ArrowRight size={18}/></Link>
          <Link to="/enquiry" className="gs-deal-secondary">Bulk purchase enquiry</Link>
        </div>
        <div className="gs-deal-points">
          <span><Truck size={16}/> Delivery support</span>
          <span><ShieldCheck size={16}/> Secure checkout</span>
        </div>
        <div className="gs-deal-dots" aria-label="Choose promotion">
          {campaigns.map((item, index) => <button key={item.eyebrow} type="button" className={index === active ? "active" : ""} aria-label={`Show ${item.eyebrow}`} onClick={() => setActive(index)}/>)}
        </div>
      </div>
      <div className="gs-deal-visual">
        <div className="gs-deal-orbit"/>
        <div className="gs-deal-product">
          <img src={current.image} alt="Featured offer"/>
        </div>
        <div className="gs-deal-sticker"><BadgePercent size={24}/><strong>{current.discount}</strong><small>Selected products</small></div>
        <div className="gs-deal-mini mini-one"><img src="/categories/computers.jpg" alt="Computer products"/></div>
        <div className="gs-deal-mini mini-two"><img src="/categories/water.jpg" alt="Water systems"/></div>
        <button type="button" className="gs-deal-arrow prev" aria-label="Previous offer" onClick={() => setActive((active + campaigns.length - 1) % campaigns.length)}><ArrowLeft size={18}/></button>
        <button type="button" className="gs-deal-arrow next" aria-label="Next offer" onClick={() => setActive((active + 1) % campaigns.length)}><ArrowRight size={18}/></button>
      </div>
    </section>
  );
}
export default DealHero;
