import { useMyOrders } from "../hooks/useMyOrders";
import { PageCard } from "../components/ui/PageCard";
import { Spinner } from "../components/ui/Spinner";

export const MyOrdersPage = () => {
  const { orders, loading, error } = useMyOrders();

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
    <PageCard title="Meus Pedidos">
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.orderNumber} className="p-4 border rounded-md">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <div>
                  <p className="font-semibold">Pedido #{order.orderNumber}</p>
                  <p className="text-sm text-gray-500">
                    Data:{" "}
                    {new Date(order.orderDate).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    Total: R$ {order.totalAmount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: {order.status}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Itens:</h4>
                <ul className="list-disc list-inside text-gray-700">
                  {order.items.map((item) => (
                    <li key={item.productId}>
                      {item.productName} (x{item.quantity})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Você ainda não fez nenhum pedido.
        </p>
      )}
    </PageCard>
  );
};
