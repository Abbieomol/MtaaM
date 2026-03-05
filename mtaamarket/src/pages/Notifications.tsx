import content from '../content';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import '../App.css';

function Notifications() {
  return (
    <div className="page">
      <Navbar />

      <h1 className="page-title">{content.notifications.title}</h1>
      <h2 className="page-subtitle">{content.notifications.subtitle}</h2>
      <p className="page-description">{content.notifications.description}</p>

      <div className="card-grid">
        <Card title="Order Shipped" description="Your thrift order #1234 has been shipped and is on the way." />
        <Card title="New Offer" description="20% off all vintage jackets this weekend only." />
        <Card title="Vendor Message" description="Mama Mboga: Your reserved floral dress is ready for pickup." />
      </div>
    </div>
  );
}

export default Notifications;