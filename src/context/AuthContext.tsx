import { useState, type ReactNode, useEffect } from "react";
import { login as apiLogin } from "../services/auth";
import { getProfile } from "../services/user";
import { AuthContext, type User } from "./authContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    const loadUserFromToken = async () => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        try {
          const profileData = await getProfile();
          setUser(profileData);
        } catch (error) {
          localStorage.removeItem("authToken");
          setToken(null);
          setUser(null);
        }
      }
      setLoadingInitial(false);
    };

    loadUserFromToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const tokenData = await apiLogin(email, password);
      localStorage.setItem("authToken", tokenData.token);
      setToken(tokenData.token);

      const profileData = await getProfile();
      setUser(profileData);
    } catch (error) {
      logout();
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  if (loadingInitial) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p>Carregando aplicação...</p>
      </div>
    );
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
