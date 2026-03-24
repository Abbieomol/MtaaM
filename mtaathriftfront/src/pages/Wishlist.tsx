import React, { useEffect, useState } from "react";
import { getWishlist, removeWishlistItem } from "../services/api";

const Wishlist: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wishlist, setWishlist] = useState<any[]>([]);

  const fetchWishlist = async () => {
    try {
      const res = await getWishlist();
      setWishlist(res.data);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

 useEffect(() => {
 
  const fetchData = async () => {
    try {
      const res = await getWishlist();
      setWishlist(res.data); 
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  fetchData();
}, []);

  const handleRemove = async (id: number) => {
    try {
      await removeWishlistItem(id);
      fetchWishlist();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  return (
    <div className="page">
      <h1>My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} className="card">
            <h3>{item.product}</h3>
            <p>Price: {item.price}</p>

            <button onClick={() => handleRemove(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;