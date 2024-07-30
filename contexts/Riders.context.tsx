import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useOrders } from "./Orders.context";
import { getRandomId, getRandomInterval } from "@/lib/utils";
import { Rider } from "@/dtos/Rider.dto";
import { Order } from "@/dtos/Order.dto";
import { OrderStatus } from "@/constants/constants";

export type RidersContextProps = {
  riders: Array<Rider>;
  handleOrderStatusChange: (order: Order, newStatus: OrderStatus) => void;
};

export const RidersContext = createContext<RidersContextProps>({
  riders: [],
  handleOrderStatusChange: () => {},
});

export type RidersProviderProps = {
  children: ReactNode;
};

export function RidersProvider({ children }: RidersProviderProps) {
  const [riders, setRiders] = useState<Array<Rider>>([]);
  const [assignedOrders, setAssignedOrders] = useState<string[]>([]);
  const { orders, pickup, updateOrderStatus } = useOrders();

  useEffect(() => {
    const ordersInProgressIds = orders
      .filter((order) => order.state !== OrderStatus.DELIVERED)
      .map((order) => order.id);

    const riderWithInvalidOrders = riders.find(
      (rider) => !ordersInProgressIds.includes(rider.orderWanted.id)
    );

    if (riderWithInvalidOrders) {
      const newRidersList = riders.filter(
        (item) => riderWithInvalidOrders.id !== item.id
      );
      setRiders(newRidersList);
    }
  }, [orders]);

  const handleOrderStatusChange = (order: Order, newStatus: OrderStatus) => {
    if (
      newStatus === OrderStatus.IN_PROGRESS &&
      !assignedOrders.includes(order.id)
    ) {
      setAssignedOrders((prev) => [...prev, order.id]);
      setTimeout(() => {
        setRiders((prev) => [
          ...prev,
          {
            orderWanted: order,
            pickup,
            id: getRandomId(),
          },
        ]);
      }, getRandomInterval(2_000, 5_000));
    }
    updateOrderStatus(order.id, newStatus);
  };

  return (
    <RidersContext.Provider value={{ riders, handleOrderStatusChange }}>
      {children}
    </RidersContext.Provider>
  );
}

export const useRiders = () => useContext(RidersContext);
