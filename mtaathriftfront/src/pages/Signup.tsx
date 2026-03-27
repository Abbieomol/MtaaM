import { useState } from "react";
import content from "../content";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/api";
import "../App.css";
import axios from "axios";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "vendor">("customer");

  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isStrongPassword = (password: string) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/.test(password);
  const hasTwoNames = (name: string) => name.trim().split(" ").length >= 2;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!hasTwoNames(fullName)) {
      setError("Please enter both first and last name.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isStrongPassword(password)) {
      setError(
        "Password must contain at least 1 uppercase letter, 1 number, and 1 special character."
      );
      return;
    }

    if (role === "vendor" && (!idDocument || !selfie)) {
      setError("Vendor must upload ID document and selfie with ID.");
      return;
    }

    try {
      // Convert to plain object for API
      const data: { fullName: string; email: string; password: string; role: string } = {
        fullName,
        email,
        password,
        role,
      };

      const res = await signup(data); // now matches updated api.ts

      console.log(res);
      alert("Signup successful. Please log in.");
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);

        const message = error.response?.data?.message;

        if (message === "User already exists") {
          setError(
            "Email already exists. Please log in or try another email."
          );
        } else {
          setError("Signup failed. Please try again.");
        }
      } else {
        console.error(error);
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">{content.signup.title}</h1>
      <h2 className="page-subtitle">{content.signup.subtitle}</h2>
      <p className="page-description">{content.signup.description}</p>

      <form className="signup-form" onSubmit={handleSignup}>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          placeholder="First and Last Name"
          className="form-input"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter a strong password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="role">Account Type</label>
        <select
          id="role"
          className="form-input"
          value={role}
          onChange={(e) =>
            setRole(e.target.value as "customer" | "vendor")
          }
        >
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
        </select>

        {role === "vendor" && (
          <>
            <label htmlFor="idDocument">ID Document</label>
            <input
              id="idDocument"
              type="file"
              className="form-input"
              accept="image/*,.pdf"
              onChange={(e) =>
                setIdDocument(e.target.files?.[0] || null)
              }
            />

            <label htmlFor="selfie">Selfie with ID</label>
            <input
              id="selfie"
              type="file"
              className="form-input"
              accept="image/*"
              onChange={(e) =>
                setSelfie(e.target.files?.[0] || null)
              }
            />
          </>
        )}

        <Button label="Sign Up" />

        {error && <p className="error-text">{error}</p>}
      </form>

      <p className="redirect-text">
        Already have an account?{" "}
        <Link to="/login" className="redirect-link">
          Log in here
        </Link>
      </p>
    </div>
  );
}

export default Signup;