import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Star, ShoppingCart, Truck, ShieldCheck } from "lucide-react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { addToCart, formatPrice } from "../utils/cart";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="container page">
        <h1>Product not found</h1>
        <Link to="/products" className="btn blue">
          Back to products
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="container page">
      <p className="crumbs">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> /{" "}
        <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
      </p>

      <div className="pd">
        <div className="pd-img">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="pd-info">
          <h1>{product.name}</h1>
          <div className="pd-rate">
            <Star size={16} fill="currentColor" /> <b>{product.rating}</b>
            <span>({product.reviews} reviews)</span>
          </div>
          <div className="pd-price">
            <strong>{formatPrice(product.price)}</strong>
            <s>{formatPrice(product.mrp)}</s>
            <em>{off}% off</em>
          </div>
          <p className="pd-desc">{product.desc}</p>

          <div className="pd-qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          <div className="pd-actions">
            <button
              className="btn blue"
              onClick={() => {
                addToCart(product, qty);
                setAdded(true);
              }}
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button
              className="btn"
              onClick={() => {
                addToCart(product, qty);
                navigate("/cart");
              }}
            >
              Buy now
            </button>
          </div>
          {added && <p className="notice">Added to your cart.</p>}

          <ul className="pd-perks">
            <li>
              <Truck size={18} /> Delivery available for institutions
            </li>
            <li>
              <ShieldCheck size={18} /> Quality checked product
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <>
          <h2 className="pd-related">Related products</h2>
          <div className="pl-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
