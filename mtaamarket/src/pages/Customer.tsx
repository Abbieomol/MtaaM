import content from '../content';
import Card from '../components/Card';
import Button from '../components/Button';
import './App.css';

function Customer() {
  return (
    <div className="page">
      <h1 className="page-title">{content.customer.title}</h1>
      <h2 className="page-subtitle">{content.customer.subtitle}</h2>
      <p className="page-description">{content.customer.description}</p>

      <div className="card-grid">
        <Card title="My Orders" description="View and track your recent purchases." />
        <Card title="Profile Settings" description="Update your personal information and preferences." />
        <Card title="Saved Items" description="Access your wishlist and saved products." />
      </div>

      <div className="button-container">
        <Button label="Edit Profile" onClick={() => alert("Edit Profile clicked")} />
      </div>
    </div>
  );
}

export default Customer;