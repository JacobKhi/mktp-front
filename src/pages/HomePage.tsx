import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Bem-vindo(a) ao Marketplace!</h1>
        {isAuthenticated ? (
          <p className="text-lg text-gray-700">
            Explore os produtos ou acesse seu perfil na barra de navegação.
          </p>
        ) : (
          <>
            <p className="text-lg text-gray-700">
              Faça o login ou crie sua conta para continuar.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/login"
                className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-100"
              >
                Criar conta
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
