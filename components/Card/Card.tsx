import { Order } from "@/dtos/Order.dto";
import { getNextStatus, getPrevStatus } from "./utils";
import s from "./Card.module.scss";
import { useOrders } from "@/contexts/Orders.context";
import { useRiders } from "@/contexts/Riders.context";

type cardProps = {
  order: Order;
};
export default function Card(props: cardProps) {
  const { updateOrderStatus } = useOrders();
  const { handleOrderStatusChange } = useRiders();

  const handleClick = (
    order: Order,
    newStatus: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED"
  ) => {
    updateOrderStatus(order.id, newStatus);
    handleOrderStatusChange(order, newStatus);
  };

  const { order } = props;
  const formattedTime = order.date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const nextStatus = getNextStatus(order.state);
  const prevStatus = getPrevStatus(order.state);

  return (
    <div key={order.id} className={s["pk-card"]}>
      <div>
        <span>
          orden: <b>{order.id}</b>
        </span>
      </div>
      <div>{formattedTime}</div>
      <div>
        {order.items.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>
      {order.state !== "PENDING" && prevStatus && (
        <button onClick={() => handleClick(order, prevStatus)}>Mover</button>
      )}
      {(order.state === "PENDING" || order.state === "IN_PROGRESS") &&
        nextStatus && (
          <button onClick={() => handleClick(order, nextStatus)}>Mover</button>
        )}
    </div>
  );
}
