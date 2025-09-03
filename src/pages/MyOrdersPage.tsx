import { useState } from "react";
import { Link } from "react-router-dom";
import { useMyOrders } from "../hooks/useMyOrders";
import { PageCard } from "../components/ui/PageCard";
import { Spinner } from "../components/ui/Spinner";
import { Button } from "../components/Button";
import { LeaveReviewModal } from "../components/forms/LeaveReviewModal";
import { OrderStatus } from "../services/order";

interface ReviewableItem {
  productId: number;
  orderId: number;
  productName: string;
}

export const MyOrdersPage = () => {
  const { orders, loading, error, reviewedProductIds, markProductAsReviewed } =
    useMyOrders();
  const [reviewingItem, setReviewingItem] = useState<ReviewableItem | null>(
    null
  );

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
              <div className="flex justify-between items-start mb-4 border-b pb-2">
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
                <ul className="space-y-2">
                  {order.items.map((item) => {
                    const isReviewed = reviewedProductIds.has(item.productId);
                    return (
                      <li
                        key={item.productId}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {item.productName} (x{item.quantity})
                        </span>
                        {order.status === OrderStatus.DELIVERED &&
                          !isReviewed && (
                            <Button
                              onClick={() =>
                                setReviewingItem({
                                  productId: item.productId,
                                  productName: item.productName,
                                  orderId: order.id,
                                })
                              }
                              className="text-xs py-1 px-2 w-auto bg-gray-600 hover:bg-gray-700"
                            >
                              Avaliar
                            </Button>
                          )}
                        {isReviewed && (
                          <span className="text-sm text-green-600 font-semibold">
                            Avaliado
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
              {order.status === OrderStatus.PROCESSING && (
                <div className="text-right mt-4">
                  <Link to={`/checkout/${order.id}`}>
                    <Button className="text-sm py-1 px-3 w-auto">
                      Pagar Agora
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Você ainda não fez nenhum pedido.
        </p>
      )}

      {reviewingItem && (
        <LeaveReviewModal
          isOpen={!!reviewingItem}
          onClose={() => setReviewingItem(null)}
          productId={reviewingItem.productId}
          orderId={reviewingItem.orderId}
          onReviewSubmit={() => {
            markProductAsReviewed(reviewingItem.productId);
          }}
        />
      )}
    </PageCard>
  );
};
