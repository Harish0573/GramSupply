import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ArrowRight,
  Truck,
  ShieldCheck,
  Headphones,
  CreditCard,
} from "lucide-react";
import HomeHero from "../components/HomeHero";
import CategoryStrip from "../components/CategoryStrip";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import { art } from "../data/art";
import "./Home.css";

const featured = products.filter((p) => p.badge === "Best seller" || p.badge === "Top rated").slice(0, 4);
const topSelling = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);

function Home() {
  const [quoteSent, setQuoteSent] = useState(false);

  return (
    <div className="home">
      <HomeHero productCount={products.length} />

      <div className="perks">
        {[
          [Truck, "Delivery available", "For institutions and offices"],
          [ShieldCheck, "Checked products", "Everything in one catalogue"],
          [Headphones, "Talk to a person", "Call or message our team"],
          [CreditCard, "5 payment options", "UPI, cards, net banking, COD, PO"],
        ].map(([Icon, title, sub]) => (
          <div key={title}>
            <Icon size={22} />
            <span>
              <b>{title}</b>
              <small>{sub}</small>
            </span>
          </div>
        ))}
      </div>

      <CategoryStrip />

      <section className="section">
        <div className="section-head">
          <h2>Featured Products</h2>
          <Link to="/products">View all →</Link>
        </div>
        <div className="grid-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="section duo">
        <div className="info-card blue">
          <div>
            <h3>Bulk Orders</h3>
            <p>Send us a list and get special prices for large quantities.</p>
            <Link to="/enquiry" className="btn dark">
              Send bulk enquiry
            </Link>
          </div>
          <img src={art("📦", "#60a5fa", "#1d4ed8")} alt="" />
        </div>
        <div className="info-card green">
          <div>
            <h3>Why GramSupply?</h3>
            <ul>
              {[
                "Everything your institution needs",
                "Best prices on bulk orders",
                "Trusted quality products",
                "Easy delivery to your door",
              ].map((t) => (
                <li key={t}>
                  <CheckCircle2 size={18} /> {t}
                </li>
              ))}
            </ul>
          </div>
          <img src={art("🛡️", "#34d399", "#047857")} alt="" />
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Top Selling Items</h2>
          <Link to="/products">View all →</Link>
        </div>
        <div className="grid-4">
          {topSelling.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="section duo">
        <Link
          to="/products?category=Furniture"
          className="promo orange"
        >
          <div>
            <small>Schools and offices</small>
            <h3>Furnish schools and offices</h3>
            <p>Chairs, tables and cupboards built to last.</p>
            <span>
              Shop furniture <ArrowRight size={16} />
            </span>
          </div>
          <img src={art("🪑", "#fdba74", "#c2410c")} alt="" />
        </Link>
        <Link to="/enquiry" className="promo purple">
          <div>
            <small>Save more</small>
            <h3>Buying in bulk?</h3>
            <p>Send us a list and get prices for large orders.</p>
            <span>
              Send an enquiry <ArrowRight size={16} />
            </span>
          </div>
          <img src={art("🧾", "#a5b4fc", "#4338ca")} alt="" />
        </Link>
      </section>

      <section className="section quote">
        <div>
          <h3>Get a bulk quote</h3>
          <p>Leave your email and our team will reply within 24 hours.</p>
        </div>
        {quoteSent ? (
          <div className="notice">Thanks! We will contact you soon.</div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setQuoteSent(true);
            }}
          >
            <input type="email" required placeholder="Enter your email address" />
            <button type="submit" className="btn">
              Request quote
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

export default Home;
