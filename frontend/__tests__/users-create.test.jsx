import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithStore } from "./test-utils";
import CreatePage from "../app/create/page";

describe("Create User (app/create/page.js)", () => {
  afterEach(() => jest.restoreAllMocks());

  test("submits create user form", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 10,
        name: "New User",
        email: "new@mail.com",
        phone: "0700000000",
      }),
    });

    renderWithStore(<CreatePage />);

    await userEvent.type(screen.getByLabelText(/name/i), "New User");
    await userEvent.type(screen.getByLabelText(/email/i), "new@mail.com");
    await userEvent.type(screen.getByLabelText(/phone/i), "0700000000");

    await userEvent.click(
      screen.getByRole("button", { name: /create|add|submit/i })
    );

    expect(global.fetch).toHaveBeenCalled();
  });
});
