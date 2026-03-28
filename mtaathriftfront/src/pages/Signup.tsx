import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import content from "../content";
import Button from "../components/Button";
import { LanguageContext } from "../context/LanguageContext";
import { signup } from "../services/api";
import "../App.css";

const Signup: React.FC = () => {
  const { translate } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  
    email: "",
    password: "",
    password2: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup button clicked!");
    setError("");

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.password2) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

   try {
  const response = await signup({
    username: formData.email, 
    email: formData.email,
    password: formData.password,
    role: formData.role,
  });


      if (response.status === 201) {
        alert("Signup successful! Please log in.");
        navigate("/login");
      } else {
        setError(response.data?.detail || "Signup failed.");
      }
    } catch (err: unknown) {
      console.error(err);
      let errorMessage = "Something went wrong. Try again.";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (err && typeof err === "object" && "response" in err) {
        const apiError = err as { response?: { data?: { detail?: string } } };
        errorMessage = apiError.response?.data?.detail || "Something went wrong. Try again.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">{translate(content.signup.title)}</h1>

      <form className="login-form" onSubmit={handleSubmit}>
       <label>Username</label>

       
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder={translate("Email Address")}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder={translate("Create Password (min 8 characters)")}
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="password2"
          placeholder={translate("Confirm Password")}
          value={formData.password2}
          onChange={handleChange}
          required
        />

        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={formData.role} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
        </select>

        {error && <p className="error">{error}</p>}

        <Button label={loading ? translate("Signing up...") : translate("Sign Up")} />
      </form>

      <p className="redirect-text">
        {translate("Already have an account?")}{" "}
        <Link to="/login" className="redirect-link">
          {translate("Log In")}
        </Link>
      </p>
    </div>
  );
};

export default Signup;