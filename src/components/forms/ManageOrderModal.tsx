import { useState, useEffect } from "react";
import {
  type Order,
  OrderStatus,
  type OrderStatus as OrderStatusType,
} from "../../services/order";
import { Input } from "../Input";
import { Button } from "../Button";

interface ManageOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateStatus: (orderId: number, newStatus: OrderStatusType) => void;
  onAddTracking: (orderId: number, trackingCode: string) => void;
}

export const ManageOrderModal = ({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
  onAddTracking,
}: ManageOrderModalProps) => {
  const [trackingCode, setTrackingCode] = useState("");

  useEffect(() => {
    if (order?.trackingCode) {
      setTrackingCode(order.trackingCode);
    } else {
      setTrackingCode("");
    }
  }, [order]);

  if (!isOpen || !order) {
    return null;
  }

  const handleTrackingSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (trackingCode.trim()) {
      onAddTracking(order.id, trackingCode.trim());
      onClose();
    }
  };

  const handleStatusUpdate = (newStatus: OrderStatusType) => {
    onUpdateStatus(order.id, newStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          Gerir Pedido #{order.orderNumber}
        </h2>

        <div className="space-y-6">
          <form onSubmit={handleTrackingSubmit}>
            <Input
              id="trackingCode"
              label="Código de Rastreio"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
            />
            <Button type="submit" className="mt-2">
              Salvar Rastreio
            </Button>
          </form>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Atualizar Status</h3>
            <div className="flex gap-4">
              {order.status === OrderStatus.PAYMENT_APPROVED && (
                <Button
                  onClick={() => handleStatusUpdate(OrderStatus.SHIPPED)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Marcar como Enviado
                </Button>
              )}
              {order.status === OrderStatus.SHIPPED && (
                <Button
                  onClick={() => handleStatusUpdate(OrderStatus.DELIVERED)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Marcar como Entregue
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600"
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};
