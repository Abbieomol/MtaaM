import { useState } from 'react';
import content from '../content';
import Card from '../components/Card';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import '../App.css';

function Search() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [price, setPrice] = useState("All");
  const [condition, setCondition] = useState("All");

  const handleSearch = () => {
    alert(`Searching for: ${query}, Category: ${category}, Size: ${size}, Price: ${price}, Condition: ${condition}`);
  };

  return (
    <div className="page">
      <Navbar />
      <h1 className="page-title">{content.search.title}</h1>
      <h2 className="page-subtitle">{content.search.subtitle}</h2>
      <p className="page-description">{content.search.description}</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search thrift items..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <Button label="Search" onClick={handleSearch} />
      </div>

      <div className="filters">
        <select aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {content.search.categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select aria-label="Size" value={size} onChange={(e) => setSize(e.target.value)}>
          {content.search.sizes.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select aria-label="Price" value={price} onChange={(e) => setPrice(e.target.value)}>
          {content.search.prices.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <select aria-label="Condition" value={condition} onChange={(e) => setCondition(e.target.value)}>
          {content.search.conditions.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="card-grid">
        <Card title="Vintage Denim Jacket" description="Size M • $25 • Good condition" />
        <Card title="Floral Dress" description="Size S • $15 • Like New" />
        <Card title="Leather Boots" description="Size 39 • $40 • Fair condition" />
      </div>
    </div>
  );
}

export default Search;