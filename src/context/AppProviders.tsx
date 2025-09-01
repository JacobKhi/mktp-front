import { type ReactNode } from "react";
import { AuthProvider } from "./AuthContext.tsx";
import { CartProvider } from "./CartProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};
