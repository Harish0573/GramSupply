import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Boxes, Truck, ShieldCheck, Headphones, Monitor, Camera, Lightbulb, Droplets } from "lucide-react";
import categories from "../data/categories";
import CountUp from "./CountUp";
import "./HomeHero.css";

function HomeHero({ productCount = 0 }) {
  const featured = [
    categories[2], // CCTV
    categories[1], // lighting
    categories, // computers
    categories[4], // water
    categories[5], // furniture
    categories[0], // cleaning
  ];
  return (
    <section className="sx-hero">
      <div className="sx-hero-copy">
        <span className="sx-pill"><i /> Institutional Marketplace</span>
        <h1>Everything your <em>institution needs,</em> in one place.</h1>
        <p>Furniture, lighting, CCTV, water systems, cleaning and more for schools, offices and village bodies, ordered online and delivered to your door.</p>
        <div className="sx-hero-cta">
          <Link to="/products" className="sx-btn solid">Shop Now <ArrowRight size={19} /></Link>
          <Link to="/enquiry" className="sx-btn ghost">Send Bulk Enquiry</Link>
        </div>
        <div className="sx-stats">
          <div><span className="sx-stat-icon"><Boxes size={20}/></span><strong><CountUp to={categories.length}/></strong><small>Departments</small></div>
          <div><span className="sx-stat-icon"><BadgeCheck size={20}/></span><strong><CountUp to={productCount}/></strong><small>Products</small></div>
          <div><span className="sx-stat-icon"><ShieldCheck size={20}/></span><strong><CountUp to={5}/></strong><small>Payment Options</small></div>
        </div>
      </div>
      <div className="sx-stage" aria-label="Featured institutional products">
        <div className="sx-stage-glow" />
        <div className="sx-product-collage">
          {featured.map((item, index) => (
            <Link key={item.id} to={`/products?category=${encodeURIComponent(item.name)}`} className={`sx-collage-item item-${index + 1}`} aria-label={item.name}>
              <img src={item.image} alt={item.name} />
            </Link>
          ))}
        </div>
        <span className="sx-float top"><Boxes size={19}/> Bulk orders welcome</span>
        <span className="sx-float side"><Truck size={19}/> Delivery available</span>
        <span className="sx-float bottom"><ShieldCheck size={18}/> Checked products</span>
      </div>
    </section>
  );
}
export default HomeHero;
