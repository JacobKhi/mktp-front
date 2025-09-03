import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AdminPage } from "./pages/AdminPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { RegisterPage } from "./pages/RegisterPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { MyProductsPage } from "./pages/MyProductsPage.tsx";
import { CreateProductPage } from "./pages/CreateProductPage.tsx";
import { EditProductPage } from "./pages/EditProductPage.tsx";
import { CreateCategoryPage } from "./pages/CreateCategoryPage.tsx";
import { ProductsListPage } from "./pages/ProductsListPage.tsx";
import { ProductDetailPage } from "./pages/ProductDetailPage.tsx";
import { AddressesPage } from "./pages/AddressesPage.tsx";
import { CartPage } from "./pages/CartPage.tsx";
import { MyOrdersPage } from "./pages/MyOrdersPage.tsx";
import { CheckoutPage } from "./pages/CheckoutPage.tsx";
import { SellerOrdersPage } from "./pages/SellerOrdersPage.tsx";
import { MainLayout } from "./components/layout/MainLayout.tsx";
import { ProtectedRoute } from "./components/auth/ProtectedRoute.tsx";
import { AppProviders } from "./context/AppProviders.tsx";
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
        path: "/products",
        element: <ProductsListPage />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetailPage />,
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
          {
            path: "/my-products",
            element: <MyProductsPage />,
          },
          {
            path: "/seller/products/edit/:productId",
            element: <EditProductPage />,
          },
          {
            path: "/seller/orders",
            element: <SellerOrdersPage />,
          },
        ],
      },

      // Grupo de rotas protegidas para Compradores
      {
        element: <ProtectedRoute allowedRoles={["CUSTOMER"]} />,
        children: [
          {
            path: "/cart",
            element: <CartPage />,
          },
          {
            path: "/my-addresses",
            element: <AddressesPage />,
          },
          {
            path: "/my-orders",
            element: <MyOrdersPage />,
          },
          {
            path: "/checkout/:orderId",
            element: <CheckoutPage />,
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
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>
);
