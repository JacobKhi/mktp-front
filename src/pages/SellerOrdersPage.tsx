import { useState } from "react";
import { useSellerOrders } from "../hooks/useSellerOrders";
import { PageCard } from "../components/ui/PageCard";
import { Spinner } from "../components/ui/Spinner";
import { Button } from "../components/Button";
import { ManageOrderModal } from "../components/forms/ManageOrderModal";
import { type Order } from "../services/order";
import { PaginationControls } from "../components/ui/PaginationControls";

export const SellerOrdersPage = () => {
  const {
    orders,
    loading,
    error,
    handleUpdateStatus,
    handleAddTracking,
    currentPage,
    totalPages,
    goToPage,
  } = useSellerOrders();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
    <PageCard title="Meus Pedidos de Venda">
      {orders.length > 0 ? (
        <>
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.orderNumber} className="p-4 border rounded-md">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 border-b pb-2">
                  <div>
                    <p className="font-semibold">Pedido #{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">
                      Data:{" "}
                      {new Date(order.orderDate).toLocaleDateString("pt-BR")}
                    </p>
                    <p className="text-sm text-gray-600">
                      Cliente: {order.customerName}
                    </p>
                  </div>
                  <div className="text-right mt-2 sm:mt-0">
                    <p className="font-semibold">
                      Total: R$ {order.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      Status: {order.status}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="font-semibold mb-2">Itens:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {order.items.map((item) => (
                        <li key={item.productId}>
                          {item.productName} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    onClick={() => setSelectedOrder(order)}
                    className="text-sm py-1 px-3 w-auto"
                  >
                    Gerir Pedido
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </>
      ) : (
        <p className="text-center text-gray-500">Nenhum pedido encontrado.</p>
      )}

      <ManageOrderModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        onUpdateStatus={handleUpdateStatus}
        onAddTracking={handleAddTracking}
      />
    </PageCard>
  );
};
