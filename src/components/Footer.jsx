import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCategories } from "../hooks/useCatalogue";
import "./Footer.css";

// One footer for every page. Every link goes to a real page.
function Footer() {
  const { t } = useTranslation();
  const categories = useCategories();
  return (
    <footer className="gf">
      <div className="vine-divider" aria-hidden="true" />
      <div className="gf-main mehndi-bg-light">
        <div className="gs-container gf-grid">
          <div className="gf-brand">
            <strong>GramSupply</strong>
            <p>{t("Supplies for panchayats, schools, offices and institutions across India.")}</p>
            <Link to="/contact" className="gf-contact">{t("Need help? Contact us")} →</Link>
          </div>
          <nav aria-label={t("Shop")}>
            <h4>{t("Shop")}</h4>
            <Link to="/products">{t("All products")}</Link>
            {categories.slice(0, 5).map((c) => (
              <Link key={c.id} to={`/products?category=${encodeURIComponent(c.name)}`}>{t(c.name)}</Link>
            ))}
          </nav>
          <nav aria-label={t("Help")}>
            <h4>{t("Help")}</h4>
            <Link to="/account?tab=orders">{t("My orders")}</Link>
            <Link to="/enquiry">{t("Request a quote")}</Link>
            <Link to="/shipping-returns">{t("Shipping & Returns")}</Link>
            <Link to="/contact">{t("Contact us")}</Link>
          </nav>
          <nav aria-label={t("Company")}>
            <h4>{t("Company")}</h4>
            <Link to="/about">{t("About us")}</Link>
            <Link to="/terms">{t("Terms & Conditions")}</Link>
            <Link to="/privacy">{t("Privacy Policy")}</Link>
            <Link to="/settings">{t("Settings")}</Link>
          </nav>
        </div>
      </div>
      <div className="gf-bottom">© {new Date().getFullYear()} GramSupply. {t("All rights reserved.")}</div>
    </footer>
  );
}

export default Footer;
