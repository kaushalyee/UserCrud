import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithStore } from "./test-utils";
import HomePage from "../app/page";

describe("Delete User (app/page.js)", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("deletes a user after confirmation and removes from UI", async () => {
    // if your delete uses window.confirm()
    jest.spyOn(window, "confirm").mockReturnValue(true);

    const fetchMock = jest.spyOn(global, "fetch");

    //  get users
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, name: "Alice", email: "alice@mail.com", phone: "0771234567" },
        { id: 2, name: "Bob", email: "bob@mail.com", phone: "0719998888" },
      ],
    });

    // delete user  1
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    renderWithStore(<HomePage />);

    // wait list render
    expect(await screen.findByText(/name:\s*alice/i)).toBeInTheDocument();
    expect(screen.getByText(/name:\s*bob/i)).toBeInTheDocument();

    // click first Delete button (Alice card)
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    await userEvent.click(deleteButtons[0]);

    // assert delete  called
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    // check that Alice removed from UI (if your reducer removes immediately)
    await waitFor(() => {
      expect(screen.queryByText(/name:\s*alice/i)).not.toBeInTheDocument();
    });

    // Bob should remain
    expect(screen.getByText(/name:\s*bob/i)).toBeInTheDocument();
  });
});
