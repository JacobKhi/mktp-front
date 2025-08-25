import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../services/auth";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { PasswordInput } from "../components/PasswordInput";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    document: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await register(formData);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        document: "",
      });
      setConfirmPassword("");
    } catch (err) {
      console.error("Falha no cadastro:", err);
      setError("Não foi possível realizar o cadastro. Verifique seus dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Crie sua conta</h1>

        {success && (
          <p className="text-sm text-center text-green-600">
            Cadastro realizado com sucesso! Você já pode fazer o login.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            label="Nome Completo"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <PasswordInput
            id="password"
            label="Senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirme a Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Input
            id="phoneNumber"
            label="Telefone"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <Input
            id="document"
            label="Documento (CPF/CNPJ)"
            type="text"
            value={formData.document}
            onChange={handleChange}
            required
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:underline"
          >
            Faça o login
          </Link>
        </p>
      </div>
    </div>
  );
};
