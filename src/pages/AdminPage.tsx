import { useState } from "react";
import { useSellerRequests } from "../hooks/useSellerRequests";
import { useUsers } from "../hooks/useUsers";
import { Button } from "../components/Button";
import { ConfirmationModal } from "../components/ui/ConfirmationModal";
import { PageCard } from "../components/ui/PageCard";
import { Spinner } from "../components/ui/Spinner";
import { type AdminUser } from "../services/admin";

interface SellerRequest {
  id: number;
  name: string;
  email: string;
}

interface ConfirmationState {
  action: "approve" | "reject" | "deleteUser" | "toggleActivation";
  target: SellerRequest | AdminUser;
}

export const AdminPage = () => {
  const {
    requests,
    loading: requestsLoading,
    error: requestsError,
    handleApprove,
    handleReject,
  } = useSellerRequests();

  const {
    users,
    loading: usersLoading,
    error: usersError,
    handleToggleActivation,
    handleDeleteUser,
  } = useUsers();

  const [confirmation, setConfirmation] = useState<ConfirmationState | null>(
    null
  );

  const handleConfirm = () => {
    if (!confirmation) return;

    const { action, target } = confirmation;

    if (action === "approve") {
      handleApprove(target.id);
    } else if (action === "reject") {
      handleReject(target.id);
    } else if (action === "deleteUser") {
      handleDeleteUser(target.id);
    } else if (action === "toggleActivation") {
      handleToggleActivation(target.id);
    }

    setConfirmation(null);
  };

  const handleCancel = () => {
    setConfirmation(null);
  };

  const isLoading = requestsLoading || usersLoading;
  const pageError = requestsError || usersError;

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner size="lg" color="border-indigo-600" />
      </div>
    );
  }

  if (pageError) {
    return <div className="text-center mt-10 text-red-500">{pageError}</div>;
  }

  const getConfirmationDetails = () => {
    if (!confirmation) return { title: "", message: "" };

    const { action, target } = confirmation;
    const userName = <strong>{target.name}</strong>;

    switch (action) {
      case "approve":
        return {
          title: "Confirmar Aprovação",
          message: (
            <>Tem a certeza que deseja aprovar {userName} como vendedor?</>
          ),
        };
      case "reject":
        return {
          title: "Confirmar Rejeição",
          message: (
            <>Tem a certeza que deseja rejeitar a solicitação de {userName}?</>
          ),
        };
      case "deleteUser":
        return {
          title: "Confirmar Exclusão",
          message: (
            <>
              Tem a certeza que deseja apagar permanentemente o utilizador{" "}
              {userName}?
            </>
          ),
        };
      case "toggleActivation": {
        const user = target as AdminUser;
        const actionText = user.isActive ? "desativar" : "ativar";
        return {
          title: `Confirmar ${user.isActive ? "Desativação" : "Ativação"}`,
          message: (
            <>
              Tem a certeza que deseja {actionText} a conta de {userName}?
            </>
          ),
        };
      }
      default:
        return { title: "", message: "" };
    }
  };

  const { title: confirmTitle, message: confirmMessage } =
    getConfirmationDetails();

  return (
    <PageCard title="Painel do Administrador">
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Solicitações de Vendedores
        </h2>
        {requests.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {requests.map((request) => (
              <li
                key={request.id}
                className="py-4 flex flex-col sm:flex-row justify-between items-center"
              >
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    {request.name}
                  </p>
                  <p className="text-sm text-gray-500">{request.email}</p>
                </div>
                <div className="flex gap-4 mt-4 sm:mt-0">
                  <Button
                    onClick={() =>
                      setConfirmation({ action: "approve", target: request })
                    }
                    className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Aprovar
                  </Button>
                  <Button
                    onClick={() =>
                      setConfirmation({ action: "reject", target: request })
                    }
                    className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Rejeitar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma solicitação pendente no momento.</p>
        )}
      </section>

      <section className="mt-8 pt-6 border-t">
        <h2 className="text-2xl font-semibold mb-4">Gerenciar Utilizadores</h2>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 border rounded-md flex flex-col sm:flex-row justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p
                  className={`text-sm font-semibold ${
                    user.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.isActive ? "Ativo" : "Inativo"}
                </p>
              </div>
              <div className="flex gap-4 mt-4 sm:mt-0">
                <Button
                  onClick={() =>
                    setConfirmation({
                      action: "toggleActivation",
                      target: user,
                    })
                  }
                  className={`text-sm py-1 px-3 ${
                    user.isActive
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {user.isActive ? "Desativar" : "Ativar"}
                </Button>
                <Button
                  onClick={() =>
                    setConfirmation({ action: "deleteUser", target: user })
                  }
                  className="bg-red-600 hover:bg-red-700 text-sm py-1 px-3"
                >
                  Apagar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ConfirmationModal
        isOpen={!!confirmation}
        title={confirmTitle}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        {confirmMessage}
      </ConfirmationModal>
    </PageCard>
  );
};
