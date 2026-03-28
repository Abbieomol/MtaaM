import axios from "axios";

interface SignupData {
  username?: string; // optional if your backend allows
  email: string;
  password: string;
  role?: string; // default to "customer"
}

interface LoginData {
  email: string;
  password: string;
}

// Create axios instance
const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Attach access token to every request except signup/login
API.interceptors.request.use((config) => {
  if (config.url?.includes("/signup/") || config.url?.includes("/login/")) {
    return config; // Do not attach token for signup/login
  }

  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses and refresh token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const res = await API.post("/auth/token/refresh/", {
            refresh: refreshToken,
          });
          localStorage.setItem("accessToken", res.data.access);
          originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
          return API(originalRequest); // Retry original request
        } catch {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login"; // Redirect to login
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

// Auth
export const signup = async (data: SignupData) => {
  const payload = {
    email: data.email,
    password: data.password,
    role: data.role || "customer",
    ...(data.username ? { username: data.username } : {}),
  };

  const res = await API.post("/auth/signup/", payload);

  // Save tokens if returned
  if (res.data.access && res.data.refresh) {
    localStorage.setItem("accessToken", res.data.access);
    localStorage.setItem("refreshToken", res.data.refresh);
  }
  return res.data;
};

export const login = async (data: LoginData) => {
  const res = await API.post("/auth/login/", data);
  if (res.data.access && res.data.refresh) {
    localStorage.setItem("accessToken", res.data.access);
    localStorage.setItem("refreshToken", res.data.refresh);
  }
  return res.data;
};

// Example: fetch products
export const fetchProducts = async () => {
  const res = await API.get("/products/");
  return res.data;
};

// Posts
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

export const removeFromCart = async (item_id: string | number) => {
  const res = await API.delete(`/cart/remove/${item_id}/`, {
    withCredentials: true,
  });
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
  const res = await API.post(
    "/wishlist/add/",
    { product_id },
    { withCredentials: true }
  );
  return res.data;
};

export const getWishlist = async () => {
  const res = await API.get("/wishlist/", { withCredentials: true });
  return res.data;
};

export const removeWishlistItem = async (item_id: number) => {
  const res = await API.delete(`/wishlist/remove/${item_id}/`, {
    withCredentials: true,
  });
  return res.data;
};

// Notifications
export const fetchNotifications = async () => {
  const res = await API.get("/notifications/", { withCredentials: true });
  return res.data;
};

// Default export
export default API;