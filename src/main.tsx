import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AdminPage } from "./pages/AdminPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { RegisterPage } from "./pages/RegisterPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { CreateProductPage } from "./pages/CreateProductPage.tsx";
import { CreateCategoryPage } from "./pages/CreateCategoryPage.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { MainLayout } from "./components/layout/MainLayout.tsx";
import { ProtectedRoute } from "./components/auth/ProtectedRoute.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },

      // Grupo de rotas protegidas para Administradores
      {
        element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
        children: [
          {
            path: "/admin",
            element: <AdminPage />,
          },
        ],
      },

      // Grupo de rotas protegidas para Vendedores
      {
        element: <ProtectedRoute allowedRoles={["SELLER"]} />,
        children: [
          {
            path: "/seller/products/create",
            element: <CreateProductPage />,
          },
          {
            path: "/seller/categories/create",
            element: <CreateCategoryPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
