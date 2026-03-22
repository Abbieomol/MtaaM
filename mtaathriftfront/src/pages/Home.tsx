import { useEffect, useState, useContext } from "react";
import content from "../content";
import Card from "../components/Card";
//import Navbar from "../components/Navbar";
import { LanguageContext } from "../context/LanguageContext";
import { fetchProducts } from "../services/api";
import "../App.css";

interface Product {
  id: string;
  title: string;
  description: string;
  image?: string;
  price?: number;
}

type UserRole = "customer" | "vendor";

const Home: React.FC = () => {
  const { translate } = useContext(LanguageContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [, setRole] = useState<UserRole>("customer");

  
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed.role) {
          setRole(parsed.role);
        }
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
  }, []);

  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="page">
      {/*<Navbar />/*}

      {/* Page header */}
      <h1 className="page-title">{translate(content.home.title)}</h1>
      <h2 className="page-subtitle">{translate(content.home.subtitle)}</h2>
      <p className="page-description">{translate(content.home.description)}</p>

      {/* Categories */}
      <div className="card-grid">
        {content.home.categories.map((cat, idx) => (
          <Card
            key={idx}
            title={translate(cat.title)}
            description={translate(cat.description)}
          />
        ))}
      </div>

      {/* Products from backend */}
      <div className="card-grid">
        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}
        {!loading &&
          !error &&
          products.map((product) => (
            <Card
              key={product.id}
              title={translate(product.title)}
              description={translate(product.description)}
              //image={product.image}
            />
          ))}
      </div>

      {/* Promo cards */}
      <div className="card-grid">
        {content.home.promoCards.map((card, idx) => (
          <Card
            key={idx}
            title={translate(card.title)}
            description={translate(card.description)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;