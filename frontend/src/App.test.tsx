import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

jest.mock("./services/apiClient/RestAPIClient");

test("renders app", () => {
  render(<App />);
  // Check header
  const headStrap = screen.getByText("eduko");
  expect(headStrap).toBeInTheDocument();
});
