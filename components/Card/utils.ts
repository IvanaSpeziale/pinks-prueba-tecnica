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
