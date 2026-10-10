import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";

const loadState = () => {
  try {
    const serialized = localStorage.getItem("reduxState");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};
const saveState = (state) => {
  try {
    localStorage.setItem("reduxState", JSON.stringify(state));
  } catch (err) {
    console.error("Could not save state", err);
  }
};
export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
  preloadedState: loadState(),
});
store.subscribe(() => {
  saveState(store.getState());
});
