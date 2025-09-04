import { useState, useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import { Button } from "../components/Button";
import {
  requestSellerProfile,
  updateProfile,
  getProfile,
  type ProfileUpdateData,
} from "../services/user";
import { PageCard } from "../components/ui/PageCard";
import { ProfileField } from "../components/ui/ProfileField";
import { Spinner } from "../components/ui/Spinner";
import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/useAuth";

export const ProfilePage = () => {
  const { profile, loading, error } = useProfile();
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileUpdateData>({
    name: "",
    phoneNumber: "",
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        phoneNumber: profile.phoneNumber,
      });
    }
  }, [profile]);

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

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setEditLoading(true);
    setEditError(null);
    try {
      await updateProfile(formData);
      if (user) {
        await getProfile();
      }
      setIsEditing(false);
    } catch (err) {
      console.error("Falha ao atualizar perfil:", err);
      setEditError("Não foi possível salvar as alterações.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
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
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <Input
            id="name"
            label="Nome Completo"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            id="phoneNumber"
            label="Telefone"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {editError && <p className="text-sm text-red-600">{editError}</p>}
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 hover:bg-gray-700"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={editLoading}>
              {editLoading ? <Spinner size="sm" /> : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <ProfileField label="Nome" value={profile.name} />
          <ProfileField label="Email" value={profile.email} />
          <ProfileField label="Telefone" value={profile.phoneNumber} />
          <ProfileField
            label="Tipo de Conta"
            value={profile.profile.toLowerCase()}
          />
          <div className="pt-2">
            <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>
          </div>
        </div>
      )}

      {profile.profile === "CUSTOMER" && (
        <div className="mt-8 pt-6 border-t">
          <h2 className="text-2xl font-bold">Gerenciar Conta</h2>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Link to="/my-addresses" className="w-full">
              <Button>Meus Endereços</Button>
            </Link>
            <Link to="/my-orders" className="w-full">
              <Button>Meus Pedidos</Button>
            </Link>
          </div>
        </div>
      )}

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
