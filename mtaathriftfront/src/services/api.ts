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
  return await API.post("/auth/signup/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const login = async (data: { email: string; password: string }) => {
  return await API.post("/auth/login/", data);
};
export const fetchProducts = async () => {
  const response = await API.get("/products/");
  return response.data;
};
export default API;