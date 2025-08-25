import { useState } from "react";
import { Button } from "../components/Button";
import { requestSellerProfile } from "../services/user";

export const BecomeSellerPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await requestSellerProfile();
      setSuccessMessage(
        response.message || "Sua solicitação foi enviada com sucesso!"
      );
    } catch (err) {
      console.error("Falha ao solicitar perfil de vendedor:", err);
      setError("Ocorreu um erro ao enviar sua solicitação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold">Torne-se um Vendedor</h1>
        <p className="mt-4 text-gray-600">
          Ao clicar no botão abaixo, você enviará uma solicitação para alterar
          seu perfil para vendedor. Nossa equipe administrativa analisará seu
          pedido.
        </p>

        <div className="mt-8">
          {!successMessage ? (
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Enviando..." : "Quero ser um vendedor"}
            </Button>
          ) : null}
        </div>

        {successMessage && (
          <p className="mt-4 text-green-600">{successMessage}</p>
        )}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};
