import { Order } from "@/dtos/Order.dto";
import { EventEmitter } from "events";
import { getRandomId, getRandomInterval } from "./utils";
import { OrderStatus } from "@/constants/constants";

export class OrderOrchestrator {
  private interval: NodeJS.Timeout | undefined;
  private maxOrders: number = getRandomInterval(10, 30);
  private eventEmitter = new EventEmitter();

  private emit(order: Order) {
    this.eventEmitter.emit("order", order);
  }

  public run() {
    this.interval = setInterval(() => {
      this.emit({
        id: getRandomId(),
        state: OrderStatus.PENDING,
        items: [],
        date: new Date(),
      });
      this.maxOrders--;
      if (this.maxOrders <= 0) {
        clearInterval(this.interval);
      }
    }, 2000);
    return this.eventEmitter;
  }
}
