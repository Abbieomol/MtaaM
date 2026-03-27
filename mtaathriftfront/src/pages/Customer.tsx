import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import content from "../content";
import Card from "../components/Card";
import Button from "../components/Button";
import "../App.css";

interface User {
  username?: string;
  email?: string;
  role?: "customer" | "vendor";
}

function Customer() {
  const navigate = useNavigate();

  // ✅ Lazy load user from localStorage (no useEffect setState)
  const [user] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch {
      console.error("Invalid user data");
      return null;
    }
  });

  // ✅ Redirect if not logged in or wrong role
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "customer") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="page">
      <h1 className="page-title">{content.customer.title}</h1>
      <h2 className="page-subtitle">{content.customer.subtitle}</h2>
      <p className="page-description">{content.customer.description}</p>

      {/* Optional greeting */}
      {user && (
        <p className="page-description">
          Welcome, {user.email || user.email}
        </p>
      )}

      <div className="card-grid">
        <Card
          title="My Orders"
          description="View and track your recent purchases."
        />
        <Card
          title="Profile Settings"
          description="Update your personal information and preferences."
        />
        <Card
          title="Saved Items"
          description="Access your wishlist and saved products."
        />
      </div>

      <div className="button-container">
        <Button
          label="Edit Profile"
          onClick={() => alert("Edit Profile clicked")}
        />
      </div>
    </div>
  );
}

export default Customer;