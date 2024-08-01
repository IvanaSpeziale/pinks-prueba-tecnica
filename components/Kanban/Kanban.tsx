// components/Kanban.tsx
import s from "./Kanban.module.scss";
import Column from "../Column";
import { useOrders } from "@/contexts/Orders.context";
import { ColumnDisplayConfig } from "@/constants/constants";

type KanbanProps = {
  columnsConfig: ColumnDisplayConfig[];
};

export default function Kanban({ columnsConfig }: KanbanProps) {
  const { orders } = useOrders();

  return (
    <section className={s["pk-kanban"]}>
      {columnsConfig.map((column) => (
        <Column
          key={column.state}
          title={column.title}
          orders={orders.filter((i) => i.state === column.state)}
          paginated={column.paginated}
        />
      ))}
    </section>
  );
}
