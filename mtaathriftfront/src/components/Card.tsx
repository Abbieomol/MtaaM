import "../App.css";
import { addToCart, addToWishlist } from "../services/api";

type CardProps = {
  title: string;
  description: string;
  productId?: number; 
};

function Card({ title, description, productId }: CardProps) {
  
  const handleAddToCart = async () => {
    if (!productId) return;
    await addToCart(productId);
    alert("Added to cart");
  };

  const handleAddToWishlist = async () => {
    if (!productId) return;
    await addToWishlist(productId);
    alert("Added to wishlist");
  };

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>

      {productId && (
        <div className="card-actions">
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={handleAddToWishlist}>Wishlist</button>
        </div>
      )}
    </div>
  );
}

export default Card;