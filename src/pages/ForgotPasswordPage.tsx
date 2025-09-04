import { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../services/password";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Spinner } from "../components/ui/Spinner";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await requestPasswordReset(email);
      setSuccessMessage(response);
    } catch (err) {
      console.error("Falha ao solicitar recuperação de senha:", err);
      setError("Não foi possível processar o seu pedido. Verifique o email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Recuperar Senha</h1>

        {!successMessage ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-sm text-center text-gray-600">
              Insira o seu email e enviaremos instruções (e o token de teste)
              para redefinir a sua senha.
            </p>
            <Input
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Enviar"}
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 mb-4">
              Pedido de recuperação enviado!
            </p>
            <div className="p-4 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-700 break-words">
                {successMessage}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                (Copie o token acima para usar na próxima etapa)
              </p>
            </div>
            <Link
              to="/reset-password"
              className="inline-block mt-4 font-medium text-indigo-600 hover:underline"
            >
              Ir para a página de redefinição →
            </Link>
          </div>
        )}

        <p className="text-sm text-center text-gray-600">
          Lembrou-se da senha?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:underline"
          >
            Voltar ao Login
          </Link>
        </p>
      </div>
    </div>
  );
};
