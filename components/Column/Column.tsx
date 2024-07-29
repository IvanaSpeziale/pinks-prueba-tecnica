import { useState } from "react";
import s from "./Column.module.scss";
import { Order } from "@/dtos/Order.dto";
import { useRiders } from "@/contexts/Riders.context";

export type ColumnProps = {
  orders: Array<Order>;
  title: string;
  onClick?: (
    order: Order,
    newStatus: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED"
  ) => void;
  paginated?: boolean;
};

const ITEMS_PER_PAGE = 3;

export default function Column(props: ColumnProps) {
  const { activateRider } = useRiders();
  const [currentPage, setCurrentPage] = useState(0);

  const getNextStatus = (
    currentStatus: string
  ): "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED" | null => {
    switch (currentStatus) {
      case "PENDING":
        return "IN_PROGRESS";
      case "IN_PROGRESS":
        return "READY";
      case "READY":
        return "DELIVERED";
      default:
        return null;
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(props.orders.length / ITEMS_PER_PAGE) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const sortedOrdersByDate = [...props.orders].sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  const paginatedOrders = props.paginated
    ? sortedOrdersByDate.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
      )
    : sortedOrdersByDate;

  return (
    <div className={s["pk-column"]}>
      <div className={s["pk-column__title"]}>
        <h3>{props.title}</h3>
      </div>
      {paginatedOrders.map((order) => {
        const formattedTime = order.date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const nextStatus = getNextStatus(order.state);
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
            {(order.state === "PENDING" || order.state === "IN_PROGRESS") &&
              nextStatus && (
                <button
                  onClick={() =>
                    props.onClick && props.onClick(order, nextStatus)
                  }
                >
                  Mover
                </button>
              )}
            {order.state === "READY" && (
              <button onClick={() => activateRider(order.id)}>
                Entregar pedido
              </button>
            )}
          </div>
        );
      })}
      {props.paginated && (
        <div className={s["pk-pagination"]}>
          <button onClick={handlePrevPage} disabled={currentPage === 0}>
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage >= Math.ceil(props.orders.length / ITEMS_PER_PAGE) - 1
            }
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
