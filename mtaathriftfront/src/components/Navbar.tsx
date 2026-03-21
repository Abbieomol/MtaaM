import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import type { User } from "../types/types";
import { LanguageContext } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import "../App.css";

type Props = {
  user: User;
  onLogout: () => void;
};

function Navbar({ user, onLogout }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { translate } = useContext(LanguageContext);

  return (
    <>
      <nav className="navbar">
        {/* Menu button */}
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        {/* Title */}
        <h2 className="navbar-title">MtaaThrifting</h2>

        {/* Links */}
        <ul className="navbar-links">
          <li><Link to="/">{translate("Home")}</Link></li>
          <li><Link to="/customer">{translate("Customer")}</Link></li>
          <li><Link to="/notifications">{translate("Notifications")}</Link></li>
          <li><Link to="/search">{translate("Search")}</Link></li>
          <li><Link to="/signup">{translate("Signup")}</Link></li>
          <li><Link to="/login">{translate("Login")}</Link></li>
          <li><Link to="/vendor">{translate("Vendor")}</Link></li>
        </ul>

        {/* Right side */}
        <div className="navbar-right">
          <Link to="/cart" className="cart-icon">
            🛒
          </Link>

          <span className="navbar-user">
            {user.username}
          </span>

          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>

          <LanguageSwitcher />
        </div>
      </nav>

      {/* Sidebar (mobile) */}
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

          <Link to="/signup" onClick={() => setSidebarOpen(false)}>
            {translate("Signup")}
          </Link>

          <Link to="/login" onClick={() => setSidebarOpen(false)}>
            {translate("Login")}
          </Link>

          <Link to="/vendor" onClick={() => setSidebarOpen(false)}>
            {translate("Vendor")}
          </Link>

          <button
            className="logout-btn"
            onClick={() => {
              setSidebarOpen(false);
              onLogout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;