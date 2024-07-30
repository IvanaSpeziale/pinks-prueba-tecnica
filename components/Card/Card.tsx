import { Order } from "@/dtos/Order.dto";
import s from "./Card.module.scss";
import { useOrders } from "@/contexts/Orders.context";
import { useRiders } from "@/contexts/Riders.context";
import { OrderStatus } from "@/constants/constants";
import { getNextStatus, getPrevStatus } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

type CardProps = {
  order: Order;
};

export default function Card(props: CardProps) {
  const { updateOrderStatus } = useOrders();
  const { handleOrderStatusChange } = useRiders();

  const handleClick = (order: Order, newStatus: OrderStatus) => {
    updateOrderStatus(order.id, newStatus);
    handleOrderStatusChange(order, newStatus);
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
      </div>
    </div>
  );
}

// import { Order } from "@/dtos/Order.dto";
// import { getNextStatus, getPrevStatus } from "./utils";
// import s from "./Card.module.scss";
// import { useOrders } from "@/contexts/Orders.context";
// import { useRiders } from "@/contexts/Riders.context";
// import { OrderStatus } from "@/constants/constants";

// type cardProps = {
//   order: Order;
// };
// export default function Card(props: cardProps) {
//   const { updateOrderStatus } = useOrders();
//   const { handleOrderStatusChange } = useRiders();

//   const handleClick = (order: Order, newStatus: OrderStatus) => {
//     updateOrderStatus(order.id, newStatus);
//     handleOrderStatusChange(order, newStatus);
//   };

//   const { order } = props;
//   const formattedTime = order.date.toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   const nextStatus = getNextStatus(order.state);
//   const prevStatus = getPrevStatus(order.state);

//   return (
//     <div key={order.id} className={s["pk-card"]}>
//       <div>
//         <span>
//           orden: <b>{order.id}</b>
//         </span>
//       </div>
//       <div>{formattedTime}</div>
//       <div>
//         {order.items.map((item, index) => (
//           <div key={index}>{item.name}</div>
//         ))}
//       </div>
//       {order.state !== OrderStatus.PENDING && prevStatus && (
//         <button onClick={() => handleClick(order, prevStatus)}>Mover</button>
//       )}
//       {(order.state === OrderStatus.PENDING ||
//         order.state === OrderStatus.IN_PROGRESS) &&
//         nextStatus && (
//           <button onClick={() => handleClick(order, nextStatus)}>Mover</button>
//         )}
//     </div>
//   );
// }
