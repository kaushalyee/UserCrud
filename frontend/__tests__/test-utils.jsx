import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import userReducer from "../redux/userSlice";

export function renderWithStore(ui, { preloadedState } = {}) {
  const store = configureStore({
    reducer: {
      users: userReducer,
    },
    preloadedState,
  });

  return { store, ...render(<Provider store={store}>{ui}</Provider>) };
}
