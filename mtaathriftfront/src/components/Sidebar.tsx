import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bell } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";
import { fetchCart, fetchNotifications } from "../services/api";
import "../styles/App.css";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [cartCount, setCartCount] = useState<number>(0);
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { translate } = useContext(LanguageContext);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".sidebar-toggle-btn")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch cart items and notifications count
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartItems = await fetchCart();
        setCartCount(cartItems.length);

        const notifications = await fetchNotifications();
        setNotificationsCount(notifications.length);
      } catch (err) {
        console.error("Failed to fetch sidebar data", err);
      }
    };
    fetchData();
  }, []);

  const links = [
    { to: "/dashboard", label: "Home", icon: "🏠" },
    { to: "/profile", label: "Profile", icon: "👤" },
    { to: "/create-post", label: "Create Post", icon: "➕" },
    {
      to: "/notifications",
      label: "Notifications",
      icon: <Bell />,
      count: notificationsCount,
    },
    { to: "/cart", label: "Cart", icon: "🛒", count: cartCount },
    { to: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        ref={sidebarRef}
        className={`sidebar ${isOpen ? "open" : "collapsed"}`}
      >
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setIsOpen(false)}
            className="sidebar-link"
          >
            <span className="sidebar-icon">{link.icon}</span>{" "}
            {translate(link.label)}
            {link.count && link.count > 0 && (
              <span className="badge">{link.count}</span>
            )}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;