export const getNextStatus = (
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

export const getPrevStatus = (
  currentStatus: string
): "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED" | null => {
  switch (currentStatus) {
    case "READY":
      return "IN_PROGRESS";
    case "IN_PROGRESS":
      return "PENDING";
    case "DELIVERED":
      return "READY";
    default:
      return null;
  }
};
