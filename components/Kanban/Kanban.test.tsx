import React from "react";
import { render } from "@testing-library/react";
import Kanban from "./Kanban";
import { OrdersContext, OrdersContextProps } from "@/contexts/Orders.context";
import { RidersContext, RidersContextProps } from "@/contexts/Riders.context";
import { Order } from "@/dtos/Order.dto";

const mockOrders: Order[] = [
  {
    id: "1",
    state: "PENDING",
    items: [
      {
        id: "item1",
        name: "Item 1",
        image: "",
        price: { currency: "USD", amount: 10 },
      },
    ],
    date: new Date(),
  },
  {
    id: "2",
    state: "IN_PROGRESS",
    items: [
      {
        id: "item2",
        name: "Item 2",
        image: "",
        price: { currency: "USD", amount: 20 },
      },
    ],
    date: new Date(),
  },
];
// Mock context values
const mockOrdersContextValue: OrdersContextProps = {
  orders: mockOrders,
  updateOrderStatus: jest.fn(),
  pickup: jest.fn(),
};

const mockRidersContextValue: RidersContextProps = {
  riders: [],
  activateRider: jest.fn(),
  handleOrderStatusChange: jest.fn(),
};

describe("Kanban Component", () => {
  test("renders Kanban component with columns", () => {
    const { container } = render(
      <OrdersContext.Provider value={mockOrdersContextValue}>
        <RidersContext.Provider value={mockRidersContextValue}>
          <Kanban />
        </RidersContext.Provider>
      </OrdersContext.Provider>
    );

    expect(container).toBeInTheDocument();
    expect(container.querySelectorAll(".pk-column__title")).toHaveLength(4);
  });
});
