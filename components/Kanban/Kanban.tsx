import s from "./Kanban.module.scss";
import Column from "../Column";
import { useOrders } from "@/contexts/Orders.context";
import { OrderStatus } from "@/constants/constants";

export default function Kanban() {
  const { orders } = useOrders();

  return (
    <section className={s["pk-kanban"]}>
      <Column
        title="Pendiente"
        orders={orders.filter((i) => i.state === OrderStatus.PENDING)}
      />
      <Column
        title="En preparación"
        orders={orders.filter((i) => i.state === OrderStatus.IN_PROGRESS)}
      />
      <Column
        title="Listo"
        orders={orders.filter((i) => i.state === OrderStatus.READY)}
      />

      <Column
        title="Entregado"
        orders={orders.filter((i) => i.state === OrderStatus.DELIVERED)}
        paginated={true}
      />
    </section>
  );
}
