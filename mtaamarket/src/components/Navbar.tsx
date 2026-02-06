import { Link } from 'react-router-dom';
import './App.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">MtaaMarket</h2>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/customer">Customer</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/vendor">Vendor</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;