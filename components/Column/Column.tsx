import { useState } from "react";
import s from "./Column.module.scss";
import { Order } from "@/dtos/Order.dto";
import Card from "../Card";

export type ColumnProps = {
  orders: Array<Order>;
  title: string;
  paginated?: boolean;
};

const ITEMS_PER_PAGE = 3;

export default function Column(props: ColumnProps) {
  const { orders, title, paginated } = props;
  const [currentPage, setCurrentPage] = useState(0);

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

  return (
    <div className={s["pk-column"]}>
      <div className={s["pk-column__title"]}>
        <h3>{title}</h3>
      </div>
      {orders.map((order) => (
        <Card key={order.id} order={order} />
      ))}
      {paginated && (
        <div className={s["pk-pagination"]}>
          <button onClick={handlePrevPage} disabled={currentPage === 0}>
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage >= Math.ceil(orders.length / ITEMS_PER_PAGE) - 1
            }
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
