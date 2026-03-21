export type User = {
  id: string;
  username: string;
  email: string;
  role: "customer" | "vendor";
  token?: string; 
};

export type AuthResponse = {
  user: User;
  token: string;
};

export type SignupPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
};