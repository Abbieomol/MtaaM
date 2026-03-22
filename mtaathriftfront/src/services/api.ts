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

export const signup = async (data: FormData) => {
  const res = await fetch("http://127.0.0.1:8000/auth/signup/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};


export const login = async (data: { email: string; password: string }) => {
  const res = await fetch("http://127.0.0.1:8000/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    body: JSON.stringify(data),
  });
    if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
};
export const fetchProducts = async () => {
  const response = await API.get("/products/");
  return response.data;
};
export const createPost = async (data: FormData) => {
  return await API.post("/posts/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addToCart = async (product_id: number) => {
  const res = await fetch(`$/cart/add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ product_id }),
  });

  return res.json();
};

export const getCart = async () => {
  const res = await fetch(`$/cart/`, {
    credentials: "include",
  });

  return res.json();
};

export const updateCartItem = async (item_id: number, quantity: number) => {
  const res = await fetch(`$/cart/update/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ item_id, quantity }),
  });

  return res.json();
};

export const removeCartItem = async (item_id: number) => {
  const res = await fetch(`$/cart/remove/${item_id}/`, {
    method: "DELETE",
    credentials: "include",
  });

  return res.json();
};

export const addToWishlist = async (product_id: number) => {
  const res = await fetch(`$/wishlist/add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ product_id }),
  });

  return res.json();
};

export const getWishlist = async () => {
  const res = await fetch(`$/wishlist/`, {
    credentials: "include",
  });

  return res.json();
};

export const removeWishlistItem = async (item_id: number) => {
  const res = await fetch(`$/wishlist/remove/${item_id}/`, {
    method: "DELETE",
    credentials: "include",
  });

  return res.json();
};
export default API;