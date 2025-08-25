import { useSellerRequests } from "../hooks/useSellerRequests";
import { Button } from "../components/Button";

export const AdminPage = () => {
  const { requests, loading, error, handleApprove, handleReject } =
    useSellerRequests();

  if (loading) {
    return <div className="text-center mt-10">Carregando solicitações...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Painel do Administrador</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
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
                    onClick={() => handleApprove(request.id)}
                    className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Aprovar
                  </Button>
                  <Button
                    onClick={() => handleReject(request.id)}
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
      </div>
    </div>
  );
};
