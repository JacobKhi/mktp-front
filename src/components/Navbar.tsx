import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {user?.profile === "ADMIN" && (
                <Link
                  to="/admin"
                  className="text-gray-600 font-semibold hover:text-indigo-600"
                >
                  Admin
                </Link>
              )}
              <Link
                to="/profile"
                className="text-gray-600 hover:text-indigo-600"
              >
                Meu Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Sair
              </button>
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
