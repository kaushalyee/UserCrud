import { screen } from "@testing-library/react";
import { renderWithStore } from "./test-utils";
import HomePage from "../app/page";

describe("Users List (app/page.js)", () => {
  afterEach(() => jest.restoreAllMocks());

  test("shows loading then renders users", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, name: "Alice", email: "alice@mail.com", phone: "0771234567" },
        { id: 2, name: "Bob", email: "bob@mail.com", phone: "0719998888" },
      ],
    });

    renderWithStore(<HomePage />);

    // change this text to what YOU display 
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // wait for data
    expect(await screen.findByText(/name:\s*alice/i)).toBeInTheDocument()
expect(screen.getByText(/email:\s*alice@mail\.com/i)).toBeInTheDocument()
expect(screen.getByText(/phone:\s*0771234567/i)).toBeInTheDocument()

  });
});
