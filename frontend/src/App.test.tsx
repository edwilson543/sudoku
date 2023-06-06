import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import App from "./App";

jest.mock("./services/apiClient/RestAPIClient");

test("renders app", async () => {
  await act(() => render(<App />));
  // Check header
  const headStrap = screen.getByText("eduko");
  expect(headStrap).toBeInTheDocument();
});
