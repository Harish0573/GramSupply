import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import {
  getCart,
  setQuantity,
  removeFromCart,
  clearCart,
  formatPrice,
} from "../utils/cart";
import "./Cart.css";

function Cart() {
  const [items, setItems] = useState(getCart());
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    const refresh = () => setItems(getCart());
    window.addEventListener("cart-updated", refresh);
    return () => window.removeEventListener("cart-updated", refresh);
  }, []);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  if (placed) {
    return (
      <div className="container page">
        <h1>Order placed 🎉</h1>
        <p className="sub">
          Thank you! Our team will confirm your order and delivery details soon.
        </p>
        <Link to="/products" className="btn blue">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1>Your cart</h1>
      <p className="sub">{items.length} item(s)</p>

      {items.length === 0 ? (
        <>
          <p className="notice">Your cart is empty.</p>
          <br />
          <Link to="/products" className="btn blue">
            Browse products
          </Link>
        </>
      ) : (
        <div className="cart">
          <div className="cart-list">
            {items.map((i) => (
              <div className="cart-row" key={i.id}>
                <img src={i.image} alt="" />
                <div className="cart-name">
                  <Link to={`/products/${i.id}`}>{i.name}</Link>
                  <b>{formatPrice(i.price)}</b>
                </div>
                <div className="pd-qty">
                  <button onClick={() => setQuantity(i.id, i.quantity - 1)}>−</button>
                  <span>{i.quantity}</span>
                  <button onClick={() => setQuantity(i.id, i.quantity + 1)}>+</button>
                </div>
                <strong className="cart-line">
                  {formatPrice(i.price * i.quantity)}
                </strong>
                <button
                  className="cart-del"
                  aria-label="Remove"
                  onClick={() => removeFromCart(i.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <aside className="cart-sum">
            <h3>Order summary</h3>
            <div>
              <span>Subtotal</span>
              <b>{formatPrice(total)}</b>
            </div>
            <div>
              <span>Delivery</span>
              <b>Free</b>
            </div>
            <div className="cart-total">
              <span>Total</span>
              <b>{formatPrice(total)}</b>
            </div>
            <button
              className="btn"
              onClick={() => {
                clearCart();
                setPlaced(true);
              }}
            >
              Place order
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Cart;
