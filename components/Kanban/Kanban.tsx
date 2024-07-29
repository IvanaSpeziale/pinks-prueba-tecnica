import s from "./Kanban.module.scss";
import Column from "../Column";
import { useOrders } from "@/contexts/Orders.context";
import { useRiders } from "@/contexts/Riders.context";
import { Order } from "@/dtos/Order.dto";

export default function Kanban() {
  const { orders, updateOrderStatus } = useOrders();
  const { handleOrderStatusChange } = useRiders();

  const handleClick = (
    order: Order,
    newStatus: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED"
  ) => {
    updateOrderStatus(order.id, newStatus);
    handleOrderStatusChange(order, newStatus);
  };

  return (
    <section className={s["pk-kanban"]}>
      <Column
        title="Pendiente"
        orders={orders.filter((i) => i.state === "PENDING")}
        onClick={(order) => handleClick(order, "IN_PROGRESS")}
      />
      <Column
        title="En preparación"
        orders={orders.filter((i) => i.state === "IN_PROGRESS")}
        onClick={(order) => handleClick(order, "READY")}
      />
      <Column
        title="Listo"
        orders={orders.filter((i) => i.state === "READY")}
      />

      <Column
        title="Entregado"
        orders={orders.filter((i) => i.state === "DELIVERED")}
        paginated={true}
      />
    </section>
  );
}
