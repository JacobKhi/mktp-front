import { useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { Button } from "../components/Button";
import { requestSellerProfile } from "../services/user";

export const ProfilePage = () => {
  const { profile, loading, error } = useProfile();

  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleBecomeSeller = async () => {
    setRequestLoading(true);
    setRequestError(null);
    setSuccessMessage(null);

    try {
      const response = await requestSellerProfile();
      setSuccessMessage(
        response.message || "Sua solicitação foi enviada com sucesso!"
      );
    } catch (err) {
      console.error("Falha ao solicitar perfil de vendedor:", err);
      setRequestError(
        "Ocorreu um erro ao enviar sua solicitação. Tente novamente."
      );
    } finally {
      setRequestLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Carregando perfil...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!profile) {
    return (
      <div className="text-center mt-10">
        Não foi possível encontrar os dados do perfil.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6 border-b pb-4">Meu Perfil</h1>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-gray-500">Nome</p>
            <p className="text-lg text-gray-800">{profile.name}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Email</p>
            <p className="text-lg text-gray-800">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Telefone</p>
            <p className="text-lg text-gray-800">{profile.phoneNumber}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Tipo de Conta</p>
            <p className="text-lg text-gray-800 capitalize">
              {profile.profile.toLowerCase()}
            </p>
          </div>
        </div>

        {profile.profile === "CUSTOMER" && (
          <div className="mt-8 pt-6 border-t">
            <h2 className="text-2xl font-bold">Torne-se um Vendedor</h2>
            <p className="mt-2 text-gray-600">
              Quer vender seus produtos em nossa plataforma? Envie uma
              solicitação para análise.
            </p>
            <div className="mt-4">
              {!successMessage ? (
                <Button onClick={handleBecomeSeller} disabled={requestLoading}>
                  {requestLoading ? "Enviando..." : "Quero ser um vendedor"}
                </Button>
              ) : null}
              {successMessage && (
                <p className="mt-4 text-green-600">{successMessage}</p>
              )}
              {requestError && (
                <p className="mt-4 text-red-600">{requestError}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
