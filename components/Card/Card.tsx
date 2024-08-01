import { Order } from "@/dtos/Order.dto";
import s from "./Card.module.scss";
import { useOrders } from "@/contexts/Orders.context";
import { useRiders } from "@/contexts/Riders.context";
import { OrderStatus } from "@/constants/constants";
import { getNextStatus, getPrevStatus } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

type CardProps = {
  order: Order;
};

export default function Card(props: CardProps) {
  const { updateOrderStatus } = useOrders();
  const { handleRiderCreation } = useRiders();

  const handleClick = (order: Order, newStatus: OrderStatus) => {
    updateOrderStatus(order.id, newStatus);
    handleRiderCreation(order, newStatus);
  };

  const { order } = props;
  const formattedTime = order.date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const nextStatus = getNextStatus(order.state as OrderStatus);
  const prevStatus = getPrevStatus(order.state as OrderStatus);

  return (
    <div key={order.id} className={s["pk-card"]}>
      <div>
        <span>
          Orden: <b>{order.id}</b>
        </span>
      </div>
      <div>{formattedTime}</div>
      <div>
        {order.items.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>
      <div className={s["buttons"]}>
        {order.state !== OrderStatus.PENDING && prevStatus && (
          <button onClick={() => handleClick(order, prevStatus)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        {(order.state === OrderStatus.PENDING ||
          order.state === OrderStatus.IN_PROGRESS) &&
          nextStatus && (
            <button onClick={() => handleClick(order, nextStatus)}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          )}
        {order.state !== OrderStatus.DELIVERED && (
          <button onClick={() => handleClick(order, OrderStatus.CANCELED)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
    </div>
  );
}
