import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PackageCheck, Truck } from "lucide-react";
import categories from "../data/categories";
import CountUp from "./CountUp";
import "./HomeHero.css";

const DELAY = 3200;

function HomeHero({ productCount = 0 }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const id = setInterval(
      () => setActive((i) => (i + 1) % categories.length),
      DELAY,
    );
    return () => clearInterval(id);
  }, [paused]);

  const current = categories[active];
  const link = `/products?category=${encodeURIComponent(current.name)}`;

  return (
    <section className="sx-hero">
      <div className="sx-hero-copy">
        <span className="sx-pill">
          <i /> Institutional marketplace
        </span>
        <h1>
          Everything your <em>institution</em> needs, in one place.
        </h1>
        <p>
          Furniture, lighting, CCTV, water systems, cleaning and more for
          schools, offices and village bodies, ordered online and delivered to
          your door.
        </p>
        <div className="sx-hero-cta">
          <Link to="/products" className="sx-btn solid">
            Shop now <ArrowRight size={20} />
          </Link>
          <Link to="/enquiry" className="sx-btn ghost">
            Send bulk enquiry
          </Link>
        </div>
        <div className="sx-stats">
          <div>
            <strong>
              <CountUp to={categories.length} />
            </strong>
            <span>Departments</span>
          </div>
          {productCount > 0 && (
            <div>
              <strong>
                <CountUp to={productCount} />
              </strong>
              <span>Products</span>
            </div>
          )}
          <div>
            <strong>
              <CountUp to={5} />
            </strong>
            <span>Payment options</span>
          </div>
        </div>
      </div>

      <div
        className="sx-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="sx-orb" />
        <div className="sx-photo">
          {categories.map((c, n) => (
            <img
              key={c.id}
              src={c.image}
              alt={n === active ? c.name : ""}
              className={n === active ? "on" : ""}
              loading={n < 2 ? "eager" : "lazy"}
            />
          ))}
        </div>

        <span className="sx-float top">
          <PackageCheck size={20} /> Bulk orders welcome
        </span>
        <span className="sx-float side">
          <Truck size={20} /> Delivery available
        </span>

        <Link to={link} className="sx-caption" key={current.id}>
          <small>Now showing</small>
          <strong>{current.name}</strong>
          <span>
            Shop now <ArrowRight size={16} />
          </span>
        </Link>

        <div className="sx-thumbs" role="tablist" aria-label="Departments">
          {categories.map((c, n) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={n === active}
              aria-label={c.name}
              className={n === active ? "on" : ""}
              onClick={() => setActive(n)}
            >
              <img src={c.image} alt="" style={{ "--fx": `${c.focus ?? 50}%` }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
