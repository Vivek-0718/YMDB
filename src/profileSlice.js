import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fav: [],
  watchlist: [],
  completed: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addToCompleted(state, action) {
      state.completed.push(action.payload);
    },
  },
});

export default profileSlice.reducer;
export const { addToCompleted } = profileSlice.actions;
export const getCompleted = (state) => state.profile.completed;