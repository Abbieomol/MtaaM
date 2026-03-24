import React, { useEffect, useState } from "react";
import { getCart, removeCartItem, updateCartItem } from "../services/api";

const Cart: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cart, setCart] = useState<any[]>([]);

  const loadCart = async () => {
    const data = await getCart();
    setCart(data);
  };

  useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchCart();
}, []);

  const handleRemove = async (id: number) => {
    await removeCartItem(id);
    loadCart();
  };

  const handleUpdate = async (id: number, qty: number) => {
    await updateCartItem(id, qty);
    loadCart();
  };

  return (
    <div className="page">
      <h1>My Cart</h1>

      {cart.map((item) => (
        <div key={item.id} className="card">
          <h3>{item.product}</h3>
          <p>Price: {item.price}</p>

          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              handleUpdate(item.id, Number(e.target.value))
            }
          />

          <button onClick={() => handleRemove(item.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;