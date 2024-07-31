export enum OrderStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  READY = "READY",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export const orderStatusList: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.IN_PROGRESS,
  OrderStatus.READY,
  OrderStatus.DELIVERED,
];

export const columnDisplayList = [
  { title: "Pendiente", state: OrderStatus.PENDING, paginated: false },
  { title: "En preparacion", state: OrderStatus.IN_PROGRESS, paginated: false },
  { title: "Listo", state: OrderStatus.READY, paginated: false },
];

export const columnDisplayHistoryList = [
  { title: "Entregado", state: OrderStatus.DELIVERED, paginated: true },
  { title: "Cancelado", state: OrderStatus.CANCELED, paginated: true },
];
