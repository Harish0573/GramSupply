import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  LogOut,
  MapPin,
  Menu,
  Package,
  Search,
  Settings as SettingsIcon,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCategories } from "../hooks/useCatalogue";
import { cartCount } from "../utils/cart";
import { getWishlist } from "../utils/wishlist";
import "./Navbar.css";

// short names for the category bar. the full name is still used for filtering
const SHORT = {
  "Cleaning & Sanitation": "Cleaning",
  "Street & Outdoor Lighting": "Lighting",
  "CCTV & Security": "CCTV",
  "Computers & Office Technology": "Computers",
  "Water Systems": "Water",
  Furniture: "Furniture",
  "Playground & Open Gym": "Playground",
  "Village Infrastructure": "Infrastructure",
  "Power, Solar & Safety": "Solar & Safety",
};

function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const categories = useCategories();

  const [query, setQuery] = useState(params.get("search") || "");
  const [searchCategory, setSearchCategory] = useState(params.get("category") || "");
  const [cart, setCart] = useState(cartCount());
  const [wish, setWish] = useState(getWishlist().length);
  const [pin, setPin] = useState(localStorage.getItem("jr_pincode") || "");
  const [pinInput, setPinInput] = useState(pin);
  const [pinError, setPinError] = useState("");
  const [open, setOpen] = useState(null); // "account" | "pin" | null
  const [drawer, setDrawer] = useState(false);
  const barRef = useRef(null);
  const isMr = i18n.language === "mr";

  // keep the counts live
  useEffect(() => {
    const sync = () => {
      setCart(cartCount());
      setWish(getWishlist().length);
    };
    window.addEventListener("cart-updated", sync);
    window.addEventListener("wishlist-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cart-updated", sync);
      window.removeEventListener("wishlist-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // close menus on outside click and on Escape
  useEffect(() => {
    const onClick = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) setOpen(null);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(null);
        setDrawer(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // stop the page scrolling behind the open drawer
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const submitSearch = (e) => {
    e.preventDefault();
    const next = new URLSearchParams();
    if (query.trim()) next.set("search", query.trim());
    if (searchCategory) next.set("category", searchCategory);
    navigate(`/products${next.toString() ? `?${next}` : ""}`);
    setDrawer(false);
  };

  const savePin = (e) => {
    e.preventDefault();
    if (pinInput && !/^\d{6}$/.test(pinInput)) {
      setPinError(t("Enter a 6 digit PIN code"));
      return;
    }
    if (pinInput) localStorage.setItem("jr_pincode", pinInput);
    else localStorage.removeItem("jr_pincode");
    setPin(pinInput);
    setPinError("");
    setOpen(null);
  };

  const handleLogout = async () => {
    setOpen(null);
    setDrawer(false);
    await logout();
    navigate("/");
  };

  const firstName = user?.name ? user.name.split(" ")[0] : "";
  const closeDrawer = () => setDrawer(false);

  return (
    <header className="nb" ref={barRef}>
      <div className="nb-top">
        <div className="gs-container nb-top-inner">
          <button type="button" className="nb-burger" onClick={() => setDrawer(true)} aria-label={t("Open menu")}>
            <Menu size={26} />
          </button>

          <Link to="/" className="nb-logo" aria-label="GramSupply home">
            <span className="nb-logo-mark">G</span>
            <span className="nb-logo-text">
              <strong>GramSupply</strong>
              <small>{t("Institutional procurement")}</small>
            </span>
          </Link>

          <div className="nb-pin-wrap">
            <button type="button" className="nb-pin" onClick={() => setOpen(open === "pin" ? null : "pin")} aria-expanded={open === "pin"}>
              <MapPin size={20} />
              <span>
                <small>{pin ? t("Delivering to") : t("Deliver to")}</small>
                <b>{pin || t("Select PIN")}</b>
              </span>
            </button>
            {open === "pin" && (
              <form className="nb-pop nb-pin-pop" onSubmit={savePin}>
                <label htmlFor="nb-pin-input">{t("Enter your PIN code")}</label>
                <input id="nb-pin-input" value={pinInput} inputMode="numeric" maxLength={6} autoFocus
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ""))} placeholder="e.g. 440001" />
                {pinError && <em role="alert">{pinError}</em>}
                <button type="submit" className="btn btn-gold">{t("Apply")}</button>
              </form>
            )}
          </div>

          <form className="nb-search" onSubmit={submitSearch} role="search">
            <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} aria-label={t("Search in category")}>
              <option value="">{t("All")}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{SHORT[c.name] || c.name}</option>
              ))}
            </select>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("Search products, brands and categories")} aria-label={t("Search products")} />
            <button type="submit" aria-label={t("Search")}><Search size={22} /></button>
          </form>

          <nav className="nb-actions" aria-label="Account and cart">
            <button type="button" className="nb-lang" onClick={() => i18n.changeLanguage(isMr ? "en" : "mr")} aria-label="Change language">
              {isMr ? "EN" : "मराठी"}
            </button>

            <div className="nb-account-wrap">
              {user ? (
                <button type="button" className="nb-link" onClick={() => setOpen(open === "account" ? null : "account")} aria-expanded={open === "account"}>
                  <UserRound size={22} />
                  <span><small>{t("Hello")}, {firstName}</small><b>{t("Account")} <ChevronDown size={14} /></b></span>
                </button>
              ) : (
                <Link to="/login" className="nb-link">
                  <UserRound size={22} />
                  <span><small>{t("Hello")}</small><b>{t("Sign in")}</b></span>
                </Link>
              )}
              {open === "account" && user && (
                <div className="nb-pop nb-account-pop">
                  <Link to="/account" onClick={() => setOpen(null)}><UserRound size={18} /> {t("My profile")}</Link>
                  <Link to="/account?tab=orders" onClick={() => setOpen(null)}><Package size={18} /> {t("My orders")}</Link>
                  <Link to="/wishlist" onClick={() => setOpen(null)}><Heart size={18} /> {t("Wishlist")}</Link>
                  <Link to="/settings" onClick={() => setOpen(null)}><SettingsIcon size={18} /> {t("Settings")}</Link>
                  <button type="button" onClick={handleLogout}><LogOut size={18} /> {t("Logout")}</button>
                </div>
              )}
            </div>

            <Link to={user ? "/account?tab=orders" : "/login"} className="nb-link nb-orders">
              <Package size={22} />
              <span><small>{t("Returns &")}</small><b>{t("My orders")}</b></span>
            </Link>

            <Link to="/wishlist" className="nb-icon" aria-label={`${t("Wishlist")} (${wish})`}>
              <Heart size={24} />
              {wish > 0 && <i>{wish}</i>}
            </Link>

            <Link to="/cart" className="nb-cart" aria-label={`${t("Cart")} (${cart})`}>
              <ShoppingCart size={26} />
              <i>{cart}</i>
              <b>{t("Cart")}</b>
            </Link>
          </nav>
        </div>
      </div>

      <div className="nb-cats">
        <div className="gs-container nb-cats-inner">
          <button type="button" className="nb-all" onClick={() => setDrawer(true)}>
            <Menu size={20} /> {t("All")}
          </button>
          <NavLink to="/products" end className="nb-cat">{t("All products")}</NavLink>
          {categories.map((c) => (
            <Link key={c.id} to={`/products?category=${encodeURIComponent(c.name)}`}
              className={`nb-cat ${params.get("category") === c.name ? "active" : ""}`}>
              {t(SHORT[c.name] || c.name)}
            </Link>
          ))}
          <Link to="/enquiry" className="nb-cat nb-quote">{t("Request a quote")}</Link>
        </div>
      </div>

      {/* delivery PIN on small screens */}
      <button type="button" className="nb-pin-bar" onClick={() => setOpen(open === "pin" ? null : "pin")}>
        <MapPin size={16} /> {pin ? `${t("Delivering to")} ${pin}` : t("Select your delivery PIN code")}
      </button>

      {/* Amazon-style slide-in menu */}
      <div className={`nb-overlay ${drawer ? "show" : ""}`} onClick={closeDrawer} aria-hidden="true" />
      <aside className={`nb-drawer ${drawer ? "show" : ""}`} aria-hidden={!drawer} aria-label="Menu">
        <div className="nb-drawer-head">
          <UserRound size={26} />
          {user ? <b>{t("Hello")}, {firstName}</b> : <Link to="/login" onClick={closeDrawer}><b>{t("Hello, sign in")}</b></Link>}
          <button type="button" onClick={closeDrawer} aria-label={t("Close menu")}><X size={24} /></button>
        </div>
        <div className="nb-drawer-body">
          <form className="nb-drawer-search" onSubmit={submitSearch}>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("Search products")} aria-label={t("Search products")} />
            <button type="submit" aria-label={t("Search")}><Search size={20} /></button>
          </form>

          <h3>{t("Shop by category")}</h3>
          <Link to="/products" onClick={closeDrawer}>{t("All products")} <ChevronRight size={18} /></Link>
          {categories.map((c) => (
            <Link key={c.id} to={`/products?category=${encodeURIComponent(c.name)}`} onClick={closeDrawer}>
              {t(c.name)} <ChevronRight size={18} />
            </Link>
          ))}

          <h3>{t("Your account")}</h3>
          <Link to={user ? "/account?tab=orders" : "/login"} onClick={closeDrawer}>{t("My orders")} <ChevronRight size={18} /></Link>
          <Link to="/wishlist" onClick={closeDrawer}>{t("Wishlist")} <ChevronRight size={18} /></Link>
          <Link to="/cart" onClick={closeDrawer}>{t("Cart")} <ChevronRight size={18} /></Link>
          <Link to={user ? "/account" : "/login"} onClick={closeDrawer}>{t("My profile")} <ChevronRight size={18} /></Link>

          <h3>{t("Help & settings")}</h3>
          <Link to="/enquiry" onClick={closeDrawer}>{t("Request a quote")} <ChevronRight size={18} /></Link>
          <Link to="/contact" onClick={closeDrawer}>{t("Contact us")} <ChevronRight size={18} /></Link>
          <Link to="/about" onClick={closeDrawer}>{t("About us")} <ChevronRight size={18} /></Link>
          <Link to="/settings" onClick={closeDrawer}>{t("Settings")} <ChevronRight size={18} /></Link>
          <button type="button" onClick={() => i18n.changeLanguage(isMr ? "en" : "mr")}>
            {t("Language")}: {isMr ? "मराठी" : "English"} <ChevronRight size={18} />
          </button>
          {user && <button type="button" onClick={handleLogout}>{t("Logout")} <LogOut size={18} /></button>}
        </div>
      </aside>

      {open === "pin" && (
        <form className="nb-pop nb-pin-sheet" onSubmit={savePin}>
          <label htmlFor="nb-pin-input-m">{t("Enter your PIN code")}</label>
          <input id="nb-pin-input-m" value={pinInput} inputMode="numeric" maxLength={6}
            onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ""))} placeholder="e.g. 440001" />
          {pinError && <em role="alert">{pinError}</em>}
          <button type="submit" className="btn btn-gold">{t("Apply")}</button>
        </form>
      )}
    </header>
  );
}

export default Navbar;
