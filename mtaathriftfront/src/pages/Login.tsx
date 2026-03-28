import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import content from "../content";
import Button from "../components/Button";
import { LanguageContext } from "../context/LanguageContext";
import { login } from "../services/api";
import "../App.css";

interface ApiErrorResponse {
  response?: {
    data?: {
      detail?: string;
    };
  };
}

const Login: React.FC = () => {
  const { translate } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login button clicked!"); 
    setLoading(true);
    setError("");

    try {
      const response = await login({ email, password });
      const data = response.data;

      // Save token and user info
      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      if (data.user?.role === "vendor") {
        navigate("/vendor");
      } else {
        navigate("/customer");
      }
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error && 'response' in err 
        ? (err as ApiErrorResponse).response?.data?.detail 
        : err instanceof Error 
        ? err.message 
        : "Login failed. Check your credentials.";
      setError(errorMessage || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">{translate(content.login.title)}</h1>
      <h2 className="page-subtitle">{translate(content.login.subtitle)}</h2>
      <p className="page-description">{translate(content.login.description)}</p>

      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={translate("Email Address")}
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder={translate("Password")}
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <Button label={loading ? translate("Logging in...") : translate("Log In")} />
      </form>

      <p className="redirect-text">
        {translate("Don’t have an account?")}{" "}
        <Link to="/signup" className="redirect-link">
          {translate("Sign up here")}
        </Link>
      </p>
    </div>
  );
};

export default Login;