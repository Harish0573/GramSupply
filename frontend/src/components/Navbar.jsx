import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  ChevronDown,
  MapPin,
  UserRound,
  LayoutGrid,
  Package,
  LogOut,
  Info,
  Headphones,
  FileText,
} from "lucide-react";
import { useAuth } from "../context/useAuth";
import categories from "../data/categories";
import { getCart } from "../utils/cart";
import "./Navbar.css";

const shortNames = {
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchText, setSearchText] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [openMenu, setOpenMenu] = useState(null); // "login" | "more" | "location" | null
  const [pincode, setPincode] = useState(
    () => localStorage.getItem("jr_pincode") || "",
  );
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const headerRef = useRef(null);

  const activeCategory = new URLSearchParams(location.search).get("category");
  const onProducts = location.pathname === "/products";

  useEffect(() => {
    const refreshCart = () => {
      setCartCount(
        getCart().reduce((sum, item) => sum + Number(item.quantity || 0), 0),
      );
    };
    refreshCart();
    window.addEventListener("cart-updated", refreshCart);
    window.addEventListener("storage", refreshCart);
    return () => {
      window.removeEventListener("cart-updated", refreshCart);
      window.removeEventListener("storage", refreshCart);
    };
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target))
        setOpenMenu(null);
    };
    const onKey = (e) => e.key === "Escape" && setOpenMenu(null);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggle = (name) => setOpenMenu(openMenu === name ? null : name);

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = searchText.trim();
    if (!keyword) return;
    navigate(`/products?search=${encodeURIComponent(keyword)}`);
  };

  const savePincode = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pinInput))
      return setPinError("Enter a 6 digit PIN code");
    localStorage.setItem("jr_pincode", pinInput);
    setPincode(pinInput);
    setPinError("");
    setOpenMenu(null);
  };

  const handleLogout = async () => {
    setOpenMenu(null);
    await logout();
    navigate("/");
  };

  return (
    <>
      <div className="announce">
        <div className="header-container announce-inner">
          <span>🎉 Bulk orders welcome: get a quote in 24 hrs</span>
          <span className="announce-right">
            <Link to="/enquiry">Send bulk enquiry</Link>
            <span>Free delivery on institutional orders</span>
          </span>
        </div>
      </div>

      <header className="site-header" ref={headerRef}>
        <div className="main-header">
          <div className="header-container main-header-inner">
            <Link to="/" className="brand-lockup">
              <span className="brand-mark">G</span>
              <span className="brand-copy">
                <strong>
                  GramSupply<span>.</span>
                </strong>
                <small>Institutional marketplace</small>
              </span>
            </Link>

            <form className="header-search" onSubmit={handleSearch}>
              <Search size={20} />
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search for products, brands and more"
                aria-label="Search products"
              />
            </form>

            <nav className="header-actions" aria-label="Account">
              <div className="dropdown">
                <button
                  className="header-link"
                  onClick={() => toggle("login")}
                  aria-expanded={openMenu === "login"}
                >
                  <UserRound size={22} />
                  <span>{user ? user.name.split(" ")[0] : "Login"}</span>
                  <ChevronDown
                    size={15}
                    className={openMenu === "login" ? "flip" : ""}
                  />
                </button>
                {openMenu === "login" && (
                  <div className="dropdown-panel">
                    {user ? (
                      <>
                        <p className="panel-head">
                          {user.name}
                          <small>Customer ID: {user.customerId}</small>
                        </p>
                        <Link to="/cart" onClick={() => setOpenMenu(null)}>
                          <Package size={16} /> My cart
                        </Link>
                        <button onClick={handleLogout}>
                          <LogOut size={16} /> Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="panel-head">
                          New customer?
                          <Link
                            to="/login"
                            className="panel-signup"
                            onClick={() => setOpenMenu(null)}
                          >
                            Sign up
                          </Link>
                        </p>
                        <Link to="/login" onClick={() => setOpenMenu(null)}>
                          <UserRound size={16} /> Login
                        </Link>
                        <Link to="/cart" onClick={() => setOpenMenu(null)}>
                          <Package size={16} /> My cart
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="dropdown location">
                <button
                  className="header-link location-btn"
                  onClick={() => toggle("location")}
                  aria-expanded={openMenu === "location"}
                >
                  <MapPin size={18} />
                  <span>
                    {pincode ? (
                      <>
                        Delivering to <b>{pincode}</b>
                      </>
                    ) : (
                      <>Set delivery location</>
                    )}
                  </span>
                  <ChevronDown
                    size={15}
                    className={openMenu === "location" ? "flip" : ""}
                  />
                </button>
                {openMenu === "location" && (
                  <form
                    className="dropdown-panel pin-panel"
                    onSubmit={savePincode}
                  >
                    <label htmlFor="pin">Enter your PIN code</label>
                    <input
                      id="pin"
                      value={pinInput}
                      onChange={(e) =>
                        setPinInput(e.target.value.replace(/\D/g, ""))
                      }
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="6 digit PIN code"
                      autoFocus
                    />
                    {pinError && <em>{pinError}</em>}
                    <button type="submit">Apply</button>
                  </form>
                )}
              </div>

              <div className="dropdown">
                <button
                  className="header-link"
                  onClick={() => toggle("more")}
                  aria-expanded={openMenu === "more"}
                >
                  <span>More</span>
                  <ChevronDown
                    size={15}
                    className={openMenu === "more" ? "flip" : ""}
                  />
                </button>
                {openMenu === "more" && (
                  <div className="dropdown-panel">
                    <Link to="/about" onClick={() => setOpenMenu(null)}>
                      <Info size={16} /> About us
                    </Link>
                    <Link to="/contact" onClick={() => setOpenMenu(null)}>
                      <Headphones size={16} /> Contact us
                    </Link>
                    <Link to="/enquiry" onClick={() => setOpenMenu(null)}>
                      <FileText size={16} /> Bulk enquiry
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/cart" className="header-link cart-link">
                <span className="cart-icon-wrap">
                  <ShoppingCart size={23} />
                  {cartCount > 0 && <i>{cartCount}</i>}
                </span>
                <span>Cart</span>
              </Link>
            </nav>
          </div>
        </div>

        <nav className="category-row" aria-label="Categories">
          <div className="header-container category-row-inner">
            <Link
              to="/products"
              className={`cat-item ${onProducts && !activeCategory ? "active" : ""}`}
            >
              <LayoutGrid size={26} />
              <span>All</span>
            </Link>
            {categories.map(({ id, name, icon: Icon }) => (
              <Link
                key={id}
                to={`/products?category=${encodeURIComponent(name)}`}
                className={`cat-item ${activeCategory === name ? "active" : ""}`}
              >
                <Icon size={26} />
                <span>{shortNames[name] || name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
