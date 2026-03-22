import React, { useEffect, useState } from "react";
import { getWishlist, removeWishlistItem } from "../services/api";

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  const loadWishlist = async () => {
    const data = await getWishlist();
    setWishlist(data);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (id: number) => {
    await removeWishlistItem(id);
    loadWishlist();
  };

  return (
    <div className="page">
      <h1>My Wishlist</h1>

      {wishlist.map((item) => (
        <div key={item.id} className="card">
          <h3>{item.product}</h3>
          <p>Price: {item.price}</p>

          <button onClick={() => handleRemove(item.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;