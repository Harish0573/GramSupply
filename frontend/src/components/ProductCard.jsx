import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { addToCart, formatPrice } from "../utils/cart";
import "./ProductCard.css";

function ProductCard({ product }) {
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <article className="pc-card">
      {product.badge && <span className="pc-badge">{product.badge}</span>}
      <Link to={`/products/${product.id}`} className="pc-img">
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div className="pc-body">
        <small className="pc-cat">{product.category}</small>
        <Link to={`/products/${product.id}`} className="pc-name">
          {product.name}
        </Link>
        <div className="pc-rating">
          <Star size={14} fill="currentColor" />
          <b>{product.rating}</b>
          <span>({product.reviews})</span>
        </div>
        <div className="pc-price">
          <strong>{formatPrice(product.price)}</strong>
          {off > 0 && (
            <>
              <s>{formatPrice(product.mrp)}</s>
              <em>{off}% off</em>
            </>
          )}
        </div>
        <button
          type="button"
          className="pc-add"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
