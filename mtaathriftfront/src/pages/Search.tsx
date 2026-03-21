import { useState } from "react";
import content from "../content";
import Card from "../components/Card";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import type { User } from "../types/types";
import { mockProducts } from "../data/mockProducts"; 
import "../App.css";

type Props = {
  user: User;
  onLogout: () => void;
};

function Search({ user, onLogout }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [price, setPrice] = useState("All");
  const [condition, setCondition] = useState("All");

  const handleSearch = () => {
    console.log({ query, category, size, price, condition });
  };

  return (
    <div className="page">
      <Navbar user={user} onLogout={onLogout} />

      <h1 className="page-title">{content.search.title}</h1>
      <h2 className="page-subtitle">{content.search.subtitle}</h2>
      <p className="page-description">{content.search.description}</p>

      {/* Search */}
      <div className="search-bar">
        <label htmlFor="searchQuery">Search</label>
        <input
          id="searchQuery"
          type="text"
          placeholder="Search thrift items..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <Button label="Search" onClick={handleSearch} />
      </div>

      {/* Filters */}
      <div className="filters">
        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {content.search.categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="size">Size</label>
          <select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            {content.search.sizes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <select
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            {content.search.prices.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="condition">Condition</label>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            {content.search.conditions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

 
      <div className="card-grid">
        {mockProducts.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            description={`${product.size} • $${product.price} • ${product.condition}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;