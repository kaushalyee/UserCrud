import reducer from "../redux/userSlice";

describe("userSlice reducer", () => {
  test("returns initial state", () => {
    const state = reducer(undefined, { type: "unknown" });
    expect(state).toBeDefined();
  });
});
