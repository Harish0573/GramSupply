import React from "react";
import { Link } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import categories from "../data/categories";
import "./CategoryStrip.css";

function CategoryStrip() {
  return (
    <section className="cs-section">
      <div className="cs-head">
        <h2>Shop by category</h2>
        <Link to="/products">View all →</Link>
      </div>
      <div className="cs-row">
        {categories.map((c) => (
          <Link
            key={c.id}
            to={`/products?category=${encodeURIComponent(c.name)}`}
            className="cs-item"
          >
            <span className="cs-circle">
              <img
                src={c.image}
                alt=""
                style={{ objectPosition: `${c.focus ?? 50}% 50%` }}
              />
            </span>
            <span className="cs-label">{c.name}</span>
          </Link>
        ))}
        <Link to="/products" className="cs-item">
          <span className="cs-circle cs-all">
            <LayoutGrid size={26} />
          </span>
          <span className="cs-label">All products</span>
        </Link>
      </div>
    </section>
  );
}

export default CategoryStrip;
