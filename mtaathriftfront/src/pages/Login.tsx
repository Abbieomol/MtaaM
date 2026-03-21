import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import content from "../content";
import Button from "../components/Button";
import { LanguageContext } from "../context/LanguageContext";
import { login } from "../services/api";
import "../App.css";

interface LoginResponse {
  token: string;
  user?: {
    role?: "customer" | "vendor";
  };
}

const Login: React.FC = () => {
  const { translate } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login({ email, password });
      const data: LoginResponse = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user?.role === "vendor") {
        navigate("/vendor");
      } else {
        navigate("/customer");
      }
    } catch (err: unknown) {
      console.error(err);

      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as {
      response?: {
        data?: {
          message?: string;
        };
      };
    };
        setError(
          axiosErr.response?.data?.message || "Login failed"
        );
      } else {
        setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">{translate(content.login.title)}</h1>
      <h2 className="page-subtitle">{translate(content.login.subtitle)}</h2>
      <p className="page-description">
        {translate(content.login.description)}
      </p>

      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
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
          placeholder={translate("Password")}
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <Button
          label={loading ? translate("Logging in...") : translate("Log In")}
        />
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