import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./CategoryCard.css";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="category-card"
    >
      <div className="category-image">
        <img
          src={category.image}
          alt={category.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.style.display = "none";
          }}
        />

        <span className="category-number">
          {String(category.id).padStart(2, "0")}
        </span>
      </div>

      <div className="category-card-content">
        <h3>{category.name}</h3>

        <p>{category.description}</p>

        <div className="category-card-footer">
          <span>Explore category</span>
          <ArrowUpRight size={19} />
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
