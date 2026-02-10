import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithStore } from "./test-utils";
import EditPage from "../app/edit/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/edit",
  useSearchParams: () => new URLSearchParams("id=1"),
}));

describe("Edit User (app/edit/page.js)", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  test("loads user, updates name, and sends update request", async () => {
    localStorage.setItem("id", "1");
    localStorage.setItem("userId", "1");
    localStorage.setItem("editUserId", "1");

    const fetchMock = jest.spyOn(global, "fetch");

    //get user by id
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        name: "Alice",
        email: "alice@mail.com",
        phone: "0771234567",
      }),
    });

    // put (update) user
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        name: "Alice Updated",
        email: "alice@mail.com",
        phone: "0771234567",
      }),
    });

    renderWithStore(<EditPage />);

    // Wait for prefill 
    // If your inputs don't have labels, switch to getByPlaceholderText
    const nameInput =
      (await screen.findByLabelText(/name/i)) ||
      (await screen.findByDisplayValue(/alice/i));

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Alice Updated");

    // Click Update /Save button 
    await userEvent.click(
      screen.getByRole("button", { name: /update|save/i })
    );

    // Make sure 2nd fetch happened
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

    // Check method used in the update call
    const updateCall = fetchMock.mock.calls[1];
    const updateOptions = updateCall[1] || {};
    expect(["PUT", "PATCH"]).toContain(updateOptions.method);

    // Check body includes updated name
    const body = updateOptions.body ? JSON.parse(updateOptions.body) : {};
    expect(body.name).toBe("Alice Updated");
  });
});
