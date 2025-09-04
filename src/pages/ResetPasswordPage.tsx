import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/password";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { PasswordInput } from "../components/PasswordInput";
import { Spinner } from "../components/ui/Spinner";

export const ResetPasswordPage = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await resetPassword(token, newPassword);
      setSuccessMessage(response);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error("Falha ao redefinir senha:", err);
      setError(
        "Não foi possível redefinir a senha. Verifique se o token está correto."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Redefinir Senha</h1>

        {!successMessage ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="token"
              label="Token de Recuperação"
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
            <PasswordInput
              id="newPassword"
              label="Nova Senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <PasswordInput
              id="confirmPassword"
              label="Confirme a Nova Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Salvar Nova Senha"}
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600">{successMessage}</p>
            <p className="mt-2 text-sm text-gray-600">
              A redirecioná-lo para a página de login...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
