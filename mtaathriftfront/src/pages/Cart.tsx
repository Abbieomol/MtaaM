import React, { useEffect, useState } from "react";
import { getCart, removeCartItem, updateCartItem } from "../services/api";

const Cart: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cart, setCart] = useState<any[]>([]);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {

  const fetchData = async () => {
    try {
      const res = await getCart();
      setCart(res.data); 
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  fetchData();
}, []);

  const handleRemove = async (id: number) => {
    try {
      await removeCartItem(id);
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleUpdate = async (id: number, qty: number) => {
    try {
      await updateCartItem(id, qty);
      fetchCart();
    } catch (err) {
      console.error("Failed to update item:", err);
    }
  };

  return (
    <div className="page">
      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="card">
            <h3>{item.product}</h3>
            <p>Price: {item.price}</p>

            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                handleUpdate(item.id, Number(e.target.value))
              }
            />

            <button onClick={() => handleRemove(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;