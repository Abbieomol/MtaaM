import content from '../content';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  return (
    <div className="page">
      <h1 className="page-title">{content.login.title}</h1>
      <h2 className="page-subtitle">{content.login.subtitle}</h2>
      <p className="page-description">{content.login.description}</p>

      <form className="login-form">
        <input type="email" placeholder="Email Address" className="form-input" />
        <input type="password" placeholder="Password" className="form-input" />
        <Button label="Log In" onClick={() => alert("Login submitted")} />
      </form>

      <p className="redirect-text">
        Don’t have an account? <Link to="/signup" className="redirect-link">Sign up here</Link>
      </p>
    </div>
  );
}

export default Login;