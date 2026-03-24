import { Link } from "react-router-dom";
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

type NavbarProps = {
  user: User | null;
  onLogout: () => void;
};

function Navbar({ user, onLogout }: NavbarProps) {
  const { translate } = useContext(LanguageContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
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

          {!user && (
            <>
              <Link to="/login" title={translate("Login")}>
                <FaUser />
              </Link>
              <Link to="/signup" title={translate("Signup")}>
                <FaUser />
              </Link>
            </>
          )}

          {user?.role === "customer" && (
            <>
              <Link to="/search" title={translate("Search")}>
                <FaSearch />
              </Link>

              <Link to="/notifications" title={translate("Notifications")}>
                <FaBell />
              </Link>

              <Link to="/wishlist" title="Wishlist">
                <FaHeart />
              </Link>

              <Link to="/cart" title="Cart">
                <FaShoppingCart />
              </Link>
            </>
          )}

          {user?.role === "vendor" && (
            <>
              <Link to="/vendor" title={translate("Dashboard")}>
                <FaStore />
              </Link>

              <Link to="/vendor/add-product" title="Add Product">
                <FaStore />
              </Link>

              <Link to="/notifications" title={translate("Notifications")}>
                <FaBell />
              </Link>
            </>
          )}
        </div>

        <div className="navbar-right">
          {user && (
            <span className="navbar-user">
              {user.username || user.email}
            </span>
          )}

          {user && (
            <button
              className="logout-btn"
              onClick={onLogout}
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

          {!user && (
            <>
              <Link to="/login" onClick={() => setSidebarOpen(false)}>
                {translate("Login")}
              </Link>

              <Link to="/signup" onClick={() => setSidebarOpen(false)}>
                {translate("Signup")}
              </Link>
            </>
          )}

          {user?.role === "customer" && (
            <>
              <Link to="/search" onClick={() => setSidebarOpen(false)}>
                {translate("Search")}
              </Link>

              <Link to="/wishlist" onClick={() => setSidebarOpen(false)}>
                Wishlist
              </Link>

              <Link to="/cart" onClick={() => setSidebarOpen(false)}>
                Cart
              </Link>

              <Link to="/notifications" onClick={() => setSidebarOpen(false)}>
                {translate("Notifications")}
              </Link>
            </>
          )}

          {user?.role === "vendor" && (
            <>
              <Link to="/vendor" onClick={() => setSidebarOpen(false)}>
                {translate("Dashboard")}
              </Link>

              <Link
                to="/vendor/add-product"
                onClick={() => setSidebarOpen(false)}
              >
                Add Product
              </Link>

              <Link
                to="/notifications"
                onClick={() => setSidebarOpen(false)}
              >
                {translate("Notifications")}
              </Link>
            </>
          )}

          {user && (
            <button
              className="logout-btn"
              onClick={() => {
                setSidebarOpen(false);
                onLogout();
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