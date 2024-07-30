import { OrderStatus } from "@/constants/constants";
import { Item } from "./Item.dto";

export type Order = {
  id: string;
  state: OrderStatus;
  items: Array<Item>;
  date: Date;
};
