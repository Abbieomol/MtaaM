import { useState } from 'react';
import content from '../content';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/api';
import '../App.css';
import axios from "axios";

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isStrongPassword = (password: string) => {
   
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/.test(password);
  };

  const hasTwoNames = (name: string) => {
    return name.trim().split(' ').length >= 2;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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

    try {
      const res = await signup({ email, password });

      console.log(res.data);
      alert("Signup successful");

      navigate('/login'); 

    } catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    console.error(error.response?.data || error.message);

    const message = error.response?.data?.message;

    if (message === "User already exists") {
      setError("Email already exists. Please log in or try another email.");
    } else {
      setError("Signup failed. Please try again.");
    }
  } else {
    console.error(error);
    setError("An unexpected error occurred.");
  }
    }
}
  return (
    <div className="page">
      <h1 className="page-title">{content.signup.title}</h1>
      <h2 className="page-subtitle">{content.signup.subtitle}</h2>
      <p className="page-description">{content.signup.description}</p>

      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name (First & Last)"
          className="form-input"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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

export default Signup