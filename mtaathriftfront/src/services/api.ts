import axios from "axios";

const API_URL = "http://localhost:5000"; 

// Fetch all products
export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

// Fetch cart items
export const fetchCart = async () => {
  const response = await axios.get(`${API_URL}/cart`);
  return response.data;
};

// Add item to cart
export const addToCart = async (itemId: string, quantity: number) => {
  const response = await axios.post(`${API_URL}/cart/add`, { itemId, quantity });
  return response.data;
};

// REMOVE item from cart
export const removeFromCart = async (itemId: string) => {
  const response = await axios.delete(`${API_URL}/cart/remove/${itemId}`);
  return response.data;
};

// Checkout cart
export const checkoutCart = async () => {
  const response = await axios.post(`${API_URL}/cart/checkout`);
  return response.data;
};

//Create a new post
export const createPost = async (formData: FormData) => {
  try {
    const token = localStorage.getItem("token"); // if your backend uses token auth
    const response = await axios.post(`${API_URL}/posts/create`, formData, {
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Failed to create post:", err);
    throw err;
  }
};
// Get follow status
export const getFollowStatus = async (username: string) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/api/follow-status/${username}/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return res.data; 
};

// Toggle follow/unfollow
export const toggleFollow = async (username: string) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API_URL}/api/toggle-follow/${username}/`, {}, {
    headers: { Authorization: `Token ${token}` },
  });
  return res.data; 
};


// Fetch notifications
export const fetchNotifications = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/notifications`, {
    headers: { Authorization: `Token ${token}` },
  });
  return res.data; 
};

// Fetch products (for displaying in Cards)
export const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
};

//Auth
interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);
  return res.data; // { token: "..." }
};
interface SignupData {
  email: string;
  password: string;
  username: string;
}

export const signupUser = async (data: SignupData) => {
  const res = await axios.post(`${API_URL}/auth/signup`, data);
  return res.data;
};