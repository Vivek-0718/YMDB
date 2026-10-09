import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fav: [],
  watchlist: [],
  completed: [],
  onSearch: [],
  loading: false,
  error: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = "";
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addToCompleted(state, action) {
      state.completed.push(action.payload);
    },
    setOnSearch(state, action) {
      state.onSearch = action.payload;
    }
  },
});

export default profileSlice.reducer;
export const { startLoading, setLoading, setError,setOnSearch, addToCompleted } = profileSlice.actions;

export const getSearchmovies = (state) => state.profile.onSearch;
export const getCompleted = (state) => state.profile.completed;
export const getLoading = (state) => state.profile.loading;
export const getError = (state) => state.profile.error;