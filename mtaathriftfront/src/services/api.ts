import axios from "axios";

// Base URL 
const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// AUTH APIs
export const signup = async (data: { email: string; password: string }) => {
  return await API.post("/auth/signup/", data);
};

export const login = async (data: { email: string; password: string }) => {
  return await API.post("/auth/login/", data);
};

export default API;