import "../App.css";
import { addToCart, addToWishlist } from "../services/api";
import { toast } from "react-toastify";

type CardProps = {
  title: string;
  description: string;
  productId?: number;
};

function Card({ title, description, productId }: CardProps) {
  const isLoggedIn = !!localStorage.getItem("token");

  const handleAddToCart = async () => {
    if (!productId) return;

    if (!isLoggedIn) {
      toast.info("Please login to add items to cart");
      return;
    }

    try {
      await addToCart(productId, 1);
      toast.success("Added to cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  const handleAddToWishlist = async () => {
    if (!productId) return;

    if (!isLoggedIn) {
      toast.info("Please login to add items to wishlist");
      return;
    }

    try {
      await addToWishlist(productId);
      toast.success("Added to wishlist");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to wishlist");
    }
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