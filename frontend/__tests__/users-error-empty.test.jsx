import { screen } from "@testing-library/react";
import { renderWithStore } from "./test-utils";
import HomePage from "../app/page";

describe("Users List - Empty and Error states", () => {
  afterEach(() => jest.restoreAllMocks());

test("shows empty state when no users", async () => {
  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  })

  renderWithStore(<HomePage />)

  expect(await screen.findByText(/no users found\./i)).toBeInTheDocument()
})

test("shows error state when API fails", async () => {
  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    ok: false,
    json: async () => ({ message: "Server error" }),
  })

  renderWithStore(<HomePage />)

  expect(await screen.findByText(/failed to fetch users/i)).toBeInTheDocument()
})

});
