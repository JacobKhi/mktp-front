import { createContext } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  profile: "CUSTOMER" | "SELLER" | "ADMIN";
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
