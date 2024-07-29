import { useOrders } from "@/contexts/Orders.context";

export const useGetOrderById = (orderId: string) => {
  const { orders } = useOrders();
  return orders.find((order) => order.id === orderId);
};
