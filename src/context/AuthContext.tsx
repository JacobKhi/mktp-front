import { useState, type ReactNode, useEffect } from "react";
import { login as apiLogin } from "../services/auth";
import { getProfile } from "../services/user";
import { AuthContext, type User } from "./authContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromToken = async () => {
      if (token) {
        try {
          const profileData = await getProfile();
          setUser(profileData);
        } catch (error) {
          setToken(null);
          setUser(null);
          localStorage.removeItem("authToken");
        }
      }
      setLoading(false);
    };

    loadUserFromToken();
  }, [token]);

  const login = async (email: string, password: string) => {
    const data = await apiLogin(email, password);
    setToken(data.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  if (loading) {
    return <div>Carregando aplicação...</div>;
  }

  const value = {
    token,
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
