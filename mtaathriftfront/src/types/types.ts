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
export type NotificationCategory =
  | "Orders"
  | "Offers"
  | "Messages";

export type Notification = {
  id: number;
  title: string;
  description: string;
  category: NotificationCategory;
};

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: number;
  user: number;
  items: CartItem[];
}
export interface WishlistItem {
  id: number;
  product: Product;
}

export interface Wishlist {
  id: number;
  user: number;
  items: WishlistItem[];
}