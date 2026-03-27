import React, { useEffect, useState } from "react";
import { fetchCart, removeFromCart, updateCartItem } from "../services/api";
import type { CartItem, Product } from "../types/types";

// Keep this internal if the API returns mixed types
type RawCartItem = {
  id: string | number;
  product: Product;
  price: string | number;
  quantity: string | number;
};

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Memoize loadCart to satisfy exhaustive-deps if needed
  useEffect(() => {
    const loadCart = async (): Promise<void> => {
      try {
        const data: RawCartItem[] = await fetchCart();
        // Normalize data once during fetch
        const numericData: CartItem[] = data.map((item) => ({
          ...item,
          id: Number(item.id),
          price: Number(item.price),
          quantity: Number(item.quantity),
        })) as CartItem[]; 
        
        setCart(numericData);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    loadCart();
  }, []);

  // Use number for id since we normalized it in loadCart
  const handleRemove = async (id: number) => {
    try {
      await removeFromCart(id);
      setCart((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleUpdate = async (id: number, qty: number) => {
    if (qty < 1) return;
    try {
      await updateCartItem(id, qty);
      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: qty } : item
        )
      );
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
            <h3>{item.product.name}</h3>
            <p>Price: ${item.price}</p>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => handleUpdate(item.id, Number(e.target.value))}
            />
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
