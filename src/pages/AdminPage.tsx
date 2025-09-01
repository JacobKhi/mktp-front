import { useState } from "react";
import { useSellerRequests } from "../hooks/useSellerRequests";
import { Button } from "../components/Button";
import { ConfirmationModal } from "../components/ui/ConfirmationModal";
import { PageCard } from "../components/ui/PageCard";
import { Spinner } from "../components/ui/Spinner";

interface ConfirmationState {
  action: "approve" | "reject";
  request: {
    id: number;
    name: string;
  };
}

export const AdminPage = () => {
  const { requests, loading, error, handleApprove, handleReject } =
    useSellerRequests();

  const [confirmation, setConfirmation] = useState<ConfirmationState | null>(
    null
  );

  const handleConfirm = () => {
    if (confirmation) {
      if (confirmation.action === "approve") {
        handleApprove(confirmation.request.id);
      } else {
        handleReject(confirmation.request.id);
      }
      setConfirmation(null);
    }
  };

  const handleCancel = () => {
    setConfirmation(null);
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

  return (
    <PageCard title="Painel do Administrador">
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
                    setConfirmation({ action: "approve", request })
                  }
                  className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Aprovar
                </Button>
                <Button
                  onClick={() => setConfirmation({ action: "reject", request })}
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

      <ConfirmationModal
        isOpen={!!confirmation}
        title={`Confirmar ${
          confirmation?.action === "approve" ? "Aprovação" : "Rejeição"
        }`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        Você tem certeza que deseja{" "}
        <strong>
          {confirmation?.action === "approve" ? "aprovar" : "rejeitar"}
        </strong>{" "}
        a solicitação de <strong>{confirmation?.request.name}</strong> para se
        tornar um vendedor?
      </ConfirmationModal>
    </PageCard>
  );
};
