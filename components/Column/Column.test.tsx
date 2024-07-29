import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { Order } from "@/dtos/Order.dto";
import Column, { ColumnProps } from "./Column";

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

const props: ColumnProps = {
  orders: mockOrders,
  title: "Test Column",
  paginated: false,
};

test("renders Column component", () => {
  const { container } = render(<Column {...props} />);
  expect(container).toBeInTheDocument();
});
