import content from "../content";
import Card from "../components/Card";
import Button from "../components/Button";
//import Navbar from "../components/Navbar";
import type { User } from "../types/types";
import "../App.css";

type Props = {
  user: User;
  onLogout: () => void;
};

// eslint-disable-next-line no-empty-pattern
function Vendor({  }: Props) {
  return (
    <div className="page">
      {/*<Navbar user={user} onLogout={onLogout} />*/}

      <h1 className="page-title">{content.vendor.title}</h1>
      <h2 className="page-subtitle">{content.vendor.subtitle}</h2>
      <p className="page-description">{content.vendor.description}</p>

      <div className="card-grid">
        <Card
          title="Product Management"
          description="Add, edit, or remove thrift items from your store."
        />
        <Card
          title="Sales Dashboard"
          description="Track your sales performance and revenue."
        />
        <Card
          title="Customer Messages"
          description="Communicate directly with your buyers."
        />
      </div>

      <div className="button-container">
        <Button
          label="Add New Product"
          onClick={() => alert("Add Product clicked")}
        />
      </div>
    </div>
  );
}

export default Vendor;