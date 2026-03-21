import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import type { User } from "../types/types";
import { LanguageContext } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import "../App.css";

function Navbar() {
  const { translate } = useContext(LanguageContext);
  const navigate = useNavigate();

  // initialize user from localStorage 
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
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <h2 className="navbar-title">MtaaThrifting</h2>

        <ul className="navbar-links">
          <li><Link to="/">{translate("Home")}</Link></li>
          <li><Link to="/customer">{translate("Customer")}</Link></li>
          <li><Link to="/notifications">{translate("Notifications")}</Link></li>
          <li><Link to="/search">{translate("Search")}</Link></li>
          <li><Link to="/signup">{translate("Signup")}</Link></li>
          <li><Link to="/login">{translate("Login")}</Link></li>
          <li><Link to="/vendor">{translate("Vendor")}</Link></li>
        </ul>

        <div className="navbar-right">
          <Link to="/cart" className="cart-icon">🛒</Link>

          {user && <span className="navbar-user">{user.username || user.email}</span>}

          {user && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}

          <LanguageSwitcher />
        </div>
      </nav>

      {sidebarOpen && (
        <div className="sidebar">
          <Link to="/" onClick={() => setSidebarOpen(false)}>{translate("Home")}</Link>
          <Link to="/customer" onClick={() => setSidebarOpen(false)}>{translate("Customer")}</Link>
          <Link to="/notifications" onClick={() => setSidebarOpen(false)}>{translate("Notifications")}</Link>
          <Link to="/search" onClick={() => setSidebarOpen(false)}>{translate("Search")}</Link>
          <Link to="/signup" onClick={() => setSidebarOpen(false)}>{translate("Signup")}</Link>
          <Link to="/login" onClick={() => setSidebarOpen(false)}>{translate("Login")}</Link>
          <Link to="/vendor" onClick={() => setSidebarOpen(false)}>{translate("Vendor")}</Link>

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