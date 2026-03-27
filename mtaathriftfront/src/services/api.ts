import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const signup = async (data: { email: string; password: string }) => {
  const res = await API.post("/auth/signup/", data);
  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await API.post("/auth/login/", data, { withCredentials: true });
  return res.data;
};

// Products
export const fetchProducts = async () => {
  const res = await API.get("/products/");
  return res.data;
};

export const createPost = async (data: FormData) => {
  const res = await API.post("/posts/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Cart
export const fetchCart = async () => {
  const res = await API.get("/cart/", { withCredentials: true });
  return res.data;
};

export const addToCart = async (product_id: number, quantity = 1) => {
  const res = await API.post(
    "/cart/add/",
    { product_id, quantity },
    { withCredentials: true }
  );
  return res.data;
};

export const removeFromCart = async (item_id: string| number) => {
  const res = await API.delete(`/cart/remove/${item_id}/`, { withCredentials: true });
  return res.data;
};

export const updateCartItem = async (item_id: number, quantity: number) => {
  const res = await API.post(
    "/cart/update/",
    { item_id, quantity },
    { withCredentials: true }
  );
  return res.data;
};

export const checkoutCart = async () => {
  const res = await API.post("/cart/checkout/", {}, { withCredentials: true });
  return res.data;
};

// Wishlist
export const addToWishlist = async (product_id: number) => {
  const res = await API.post("/wishlist/add/", { product_id }, { withCredentials: true });
  return res.data;
};

export const getWishlist = async () => {
  const res = await API.get("/wishlist/", { withCredentials: true });
  return res.data;
};

export const removeWishlistItem = async (item_id: number) => {
  const res = await API.delete(`/wishlist/remove/${item_id}/`, { withCredentials: true });
  return res.data;
};

// Notifications
export const fetchNotifications = async () => {
  const res = await API.get("/notifications/", { withCredentials: true });
  return res.data;
};

// Default export
export default API;