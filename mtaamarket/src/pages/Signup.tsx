import content from '../content';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  return (
    <div className="page">
      <h1 className="page-title">{content.signup.title}</h1>
      <h2 className="page-subtitle">{content.signup.subtitle}</h2>
      <p className="page-description">{content.signup.description}</p>

      <form className="signup-form">
        <input type="text" placeholder="Full Name" className="form-input" />
        <input type="email" placeholder="Email Address" className="form-input" />
        <input type="password" placeholder="Password" className="form-input" />
        <Button label="Sign Up" onClick={() => alert("Signup submitted")} />
      </form>

      <p className="redirect-text">
        Already have an account? <Link to="/login" className="redirect-link">Log in here</Link>
      </p>
    </div>
  );
}

export default Signup;