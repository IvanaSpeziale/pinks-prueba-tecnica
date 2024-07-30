import { OrderStatus, orderStatusList } from "@/constants/constants";

export const getNextStatus = (
  currentStatus: OrderStatus
): OrderStatus | null => {
  const currentIndex = orderStatusList.indexOf(currentStatus);
  return currentIndex >= 0 && currentIndex < orderStatusList.length - 1
    ? orderStatusList[currentIndex + 1]
    : null;
};

export const getPrevStatus = (
  currentStatus: OrderStatus
): OrderStatus | null => {
  const currentIndex = orderStatusList.indexOf(currentStatus);
  return currentIndex > 0 ? orderStatusList[currentIndex - 1] : null;
};

// // @/utils/index.ts
// import { OrderStatus } from "@/constants/constants";

// export const getNextStatus = (
//   currentStatus: OrderStatus
// ): OrderStatus | null => {
//   switch (currentStatus) {
//     case OrderStatus.PENDING:
//       return OrderStatus.IN_PROGRESS;
//     case OrderStatus.IN_PROGRESS:
//       return OrderStatus.READY;
//     case OrderStatus.READY:
//       return OrderStatus.DELIVERED;
//     default:
//       return null;
//   }
// };

// export const getPrevStatus = (
//   currentStatus: OrderStatus
// ): OrderStatus | null => {
//   switch (currentStatus) {
//     case OrderStatus.READY:
//       return OrderStatus.IN_PROGRESS;
//     case OrderStatus.IN_PROGRESS:
//       return OrderStatus.PENDING;
//     case OrderStatus.DELIVERED:
//       return OrderStatus.READY;
//     default:
//       return null;
//   }
// };
