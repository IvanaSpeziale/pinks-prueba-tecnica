import { Order } from "./Order.dto";

export type Rider = {
  id: string;
  orderWanted: Order;
  pickup: (order: Order) => void;
};
