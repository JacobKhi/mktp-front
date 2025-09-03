import { type ReactNode } from "react";
import { AuthProvider } from "./AuthContext.tsx";
import { CartProvider } from "./CartProvider";
import { NotificationProvider } from "./NotificationProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </CartProvider>
    </AuthProvider>
  );
};
