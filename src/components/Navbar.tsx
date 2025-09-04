import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { ProfileDropdown } from "../components/ui/ProfileDropdown";

export const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const { itemCount } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-xl font-bold text-gray-800 hover:text-indigo-600"
          >
            Marketplace
          </Link>
          <Link to="/" className="text-gray-600 hover:text-indigo-600">
            Início
          </Link>
          <Link to="/products" className="text-gray-600 hover:text-indigo-600">
            Produtos
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {user?.profile === "CUSTOMER" && (
                <Link
                  to="/cart"
                  className="relative text-gray-600 hover:text-indigo-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.835l1.823-6.836a.75.75 0 00-.74-1.03H5.707L5.432 4.57a.75.75 0 00-.74-1.03H3.75M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.835l1.823-6.836a.75.75 0 00-.74-1.03H5.707L5.432 4.57a.75.75 0 00-.74-1.03H3.75"
                    />
                  </svg>
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
              )}
              <ProfileDropdown />
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600">
                Entrar
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Criar Conta
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
