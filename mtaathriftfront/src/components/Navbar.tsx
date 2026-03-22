import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import type { User } from "../types/types";
import { LanguageContext } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  FaHome,
  FaUser,
  FaBell,
  FaSearch,
  FaShoppingCart,
  FaStore,
  FaSignOutAlt,
  FaHeart
} from "react-icons/fa";
import "../App.css";

function Navbar() {
  const { translate } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        console.error("Invalid user data in localStorage");
      }
    }
    return null;
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        {/* LEFT */}
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <h2 className="navbar-title">MtaaThrifting</h2>

        
        <div className="navbar-icons">
          <Link to="/" title={translate("Home")}>
            <FaHome />
          </Link>

          <Link to="/customer" title={translate("Customer")}>
            <FaUser />
          </Link>

          <Link to="/notifications" title={translate("Notifications")}>
            <FaBell />
          </Link>

          <Link to="/search" title={translate("Search")}>
            <FaSearch />
          </Link>

          <Link to="/wishlist" title="Wishlist">
            <FaHeart />
          </Link>

          <Link to="/cart" title="Cart">
            <FaShoppingCart />
          </Link>

          <Link to="/vendor" title={translate("Vendor")}>
            <FaStore />
          </Link>
        </div>

        {/* RIGHT */}
        <div className="navbar-right">
          {user && (
            <span className="navbar-user">
              {user.username || user.email}
            </span>
          )}

          {user && (
            <button
              className="logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              <FaSignOutAlt />
            </button>
          )}

          <LanguageSwitcher />
        </div>
      </nav>

      {/* SIDEBAR */}
      {sidebarOpen && (
        <div className="sidebar">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            {translate("Home")}
          </Link>

          <Link to="/customer" onClick={() => setSidebarOpen(false)}>
            {translate("Customer")}
          </Link>

          <Link to="/notifications" onClick={() => setSidebarOpen(false)}>
            {translate("Notifications")}
          </Link>

          <Link to="/search" onClick={() => setSidebarOpen(false)}>
            {translate("Search")}
          </Link>

          <Link to="/wishlist" onClick={() => setSidebarOpen(false)}>
            Wishlist
          </Link>

          <Link to="/cart" onClick={() => setSidebarOpen(false)}>
            Cart
          </Link>

          <Link to="/vendor" onClick={() => setSidebarOpen(false)}>
            {translate("Vendor")}
          </Link>

          {!user && (
            <>
              <Link to="/signup" onClick={() => setSidebarOpen(false)}>
                {translate("Signup")}
              </Link>

              <Link to="/login" onClick={() => setSidebarOpen(false)}>
                {translate("Login")}
              </Link>
            </>
          )}

          {user && (
            <button
              className="logout-btn"
              onClick={() => {
                setSidebarOpen(false);
                handleLogout();
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;