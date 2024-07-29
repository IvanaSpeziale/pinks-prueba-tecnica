import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Order } from "@/dtos/Order.dto";
import { OrderOrchestrator } from "@/lib";

export type OrdersContextProps = {
  orders: Array<Order>;
  updateOrderStatus: (
    orderId: string,
    newStatus: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED"
  ) => void;
  pickup: (order: Order) => void;
};

export const OrdersContext = createContext<OrdersContextProps>({
  orders: [],
  updateOrderStatus: () => {},
  pickup: () => {},
});

export type OrdersProviderProps = {
  children: ReactNode;
};

export function OrdersProvider({ children }: OrdersProviderProps) {
  const [orders, setOrders] = useState<Array<Order>>([]);

  useEffect(() => {
    const orderOrchestrator = new OrderOrchestrator();
    const listener = orderOrchestrator.run();
    listener.on("order", (order) => {
      setOrders((prev) => [...prev, order]);
    });
  }, []);

  const updateOrderStatus = (
    orderId: string,
    newStatus: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED"
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, state: newStatus } : order
      )
    );
  };

  const pickup = (order: Order) => {
    if (order.state !== "READY") {
      return;
    }
    try {
      setOrders((prev) =>
        prev.map((item) =>
          item.id === order.id ? { ...item, state: "DELIVERED" } : item
        )
      );
      alert("La orden ha sido recogida!");
    } catch (error) {
      alert("Ha habido un error con la entrega");
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, updateOrderStatus, pickup }}>
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
