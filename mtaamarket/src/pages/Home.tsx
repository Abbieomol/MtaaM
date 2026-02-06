import content from '../content';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import '../App.css';

function Home() {
  return (
    <div className="page">
      <Navbar />

      <h1 className="page-title">{content.home.title}</h1>
      <h2 className="page-subtitle">{content.home.subtitle}</h2>
      <p className="page-description">{content.home.description}</p>

      <div className="card-grid">
        <Card title="Thrift Clothes" description="Explore tops, bottoms, dresses, and outerwear at affordable prices." />
        <Card title="Shoes & Accessories" description="Find second-hand shoes, bags, and jewelry to complete your look." />
        <Card title="Local Vendors" description="Support sellers in your community offering unique thrift finds." />
      </div>

      <div className="card-grid">
        <Card title="Sustainable Shopping" description="Reduce waste and embrace eco-friendly fashion choices." />
        <Card title="Exclusive Deals" description="Enjoy discounts on trending thrift collections." />
      </div>
    </div>
  );
}

export default Home;