import React from "react";
import { Link } from "react-router-dom";
import categories from "../data/categories";
import "./Footer.css";

function Footer() {
  return (
    <footer className="ft">
      <div className="ft-inner">
        <div className="ft-brand">
          <div className="ft-logo">
            <span>G</span>
            <strong>
              GramSupply<i>.</i>
            </strong>
          </div>
          <p>
            One marketplace for schools, offices and village bodies: furniture,
            lighting, CCTV, water systems and more, delivered to your door.
          </p>
        </div>

        <div>
          <h4>Shop</h4>
          {categories.slice(0, 5).map((c) => (
            <Link
              key={c.id}
              to={`/products?category=${encodeURIComponent(c.name)}`}
            >
              {c.name}
            </Link>
          ))}
          <Link to="/products">All products</Link>
        </div>

        <div>
          <h4>Support</h4>
          <Link to="/contact">Contact us</Link>
          <Link to="/enquiry">Bulk enquiry</Link>
          <Link to="/cart">My cart</Link>
          <Link to="/login">Login</Link>
        </div>

        <div>
          <h4>Company</h4>
          <Link to="/about">About us</Link>
          <Link to="/contact">Careers</Link>
          <Link to="/contact">Privacy policy</Link>
          <Link to="/contact">Terms of service</Link>
        </div>
      </div>
      <div className="ft-bottom">
        © {new Date().getFullYear()} GramSupply. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
