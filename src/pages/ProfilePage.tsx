import { useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { Button } from "../components/Button";
import { requestSellerProfile } from "../services/user";
import { PageCard } from "../components/ui/PageCard";
import { ProfileField } from "../components/ui/ProfileField";
import { Spinner } from "../components/ui/Spinner";
import { Link } from "react-router-dom";

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
    return (
      <div className="flex justify-center mt-10">
        <Spinner size="lg" color="border-indigo-600" />
      </div>
    );
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
    <PageCard title="Meu Perfil">
      <div className="space-y-4">
        <ProfileField label="Nome" value={profile.name} />
        <ProfileField label="Email" value={profile.email} />
        <ProfileField label="Telefone" value={profile.phoneNumber} />
        <ProfileField
          label="Tipo de Conta"
          value={profile.profile.toLowerCase()}
        />
      </div>

      <div className="mt-8 pt-6 border-t">
        <h2 className="text-2xl font-bold">Gerenciar Conta</h2>
        <div className="mt-4">
          <Link to="/my-addresses">
            <Button>Meus Endereços</Button>
          </Link>
          <Link to="/my-orders">
            <Button>Meus Pedidos</Button>
          </Link>
        </div>
      </div>

      {profile.profile === "CUSTOMER" && (
        <div className="mt-8 pt-6 border-t">
          <h2 className="text-2xl font-bold">Torne-se um Vendedor</h2>
          <p className="mt-2 text-gray-600">
            Quer vender seus produtos em nossa plataforma? Envie uma solicitação
            para análise.
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
    </PageCard>
  );
};
