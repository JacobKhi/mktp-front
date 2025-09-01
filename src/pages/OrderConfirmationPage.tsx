import { useLocation, Link } from "react-router-dom";
import { PageCard } from "../components/ui/PageCard";
import { type Order } from "../services/order";

export const OrderConfirmationPage = () => {
  const location = useLocation();
  const order = location.state?.order as Order | undefined;

  if (!order) {
    return (
      <PageCard title="Erro na Confirmação">
        <p className="text-center">
          Não foi possível carregar os detalhes do pedido.
        </p>
        <div className="text-center mt-4">
          <Link to="/products" className="text-indigo-600 hover:underline">
            Voltar para a loja
          </Link>
        </div>
      </PageCard>
    );
  }

  return (
    <PageCard title="Pedido Confirmado!">
      <div className="space-y-4">
        <p className="text-lg text-center">
          Obrigado pela sua compra, {order.customerName}!
        </p>
        <div className="p-4 border rounded-md">
          <p>
            <strong>Número do Pedido:</strong> {order.orderNumber}
          </p>
          <p>
            <strong>Data:</strong>{" "}
            {new Date(order.orderDate).toLocaleDateString("pt-BR")}
          </p>
          <p>
            <strong>Total:</strong> R$ {order.totalAmount.toFixed(2)}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </div>
        <h3 className="text-xl font-semibold mt-6">Itens do Pedido</h3>
        <ul className="divide-y divide-gray-200">
          {order.items.map((item) => (
            <li key={item.productId} className="py-2 flex justify-between">
              <span>
                {item.productName} (x{item.quantity})
              </span>
              <span>R$ {(item.unitPrice * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </PageCard>
  );
};
