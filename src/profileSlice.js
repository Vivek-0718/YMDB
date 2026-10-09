import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fav: [],
  watchlist: [],
  completed: [],
  onSearch: [],
  loading: false,
  error: "",
  selectedMovie: {},
  userRatings: {},
  savedRatings: {},

  modal: {
    isOpen: false,
    type: null,
    props: {},
  },
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

    setOnSearch(state, action) {
      state.onSearch = action.payload;
    },

    selectSearch(state, action) {
      const movie = action.payload;
      const movieId = movie.imdbID;

      const runtime = Number.parseInt(
        String(movie.Runtime || "").match(/\d+/)?.[0] || 0,
        10,
      );

      state.selectedMovie = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        runtime,
        imdbRating: movie.imdbRating || "",
        userRating: state.savedRatings[movieId] || 0,
        isFav: state.fav.some((item) => item.imdbID === movieId),
        isInWatchlist: state.watchlist.some((item) => item.imdbID === movieId),
      };
    },

    openModal: (state, action) => {
      state.modal.isOpen = true;
      state.modal.type = action.payload.type;
      state.modal.props = action.payload.props || {};
    },
    closeModal: (state) => {
      state.modal = { isOpen: false, type: null, props: {} };
    },

    toggleFavorite(state, action) {
      const movie = action.payload;
      const movieId = movie.imdbID;

      const exists = state.fav.some((item) => item.imdbID === movieId);

      state.fav = exists
        ? state.fav.filter((item) => item.imdbID !== movieId)
        : [...state.fav, movie];
    },

    toggleWatchlist(state, action) {
      const movieId = action.payload;

      const exists = state.watchlist.some((item) => item.imdbID === movieId);

      if (exists) {
        state.watchlist = state.watchlist.filter(
          (item) => item.imdbID !== movieId,
        );
        state.selectedMovie.isInWatchlist = false;
      } else {
        state.watchlist = [...state.watchlist, movieId];
        state.selectedMovie.isInWatchlist = true;
      }
    },

    setUserRating(state, action) {
      const { movieId, rating } = action.payload;
      state.userRatings[movieId] = rating;
    },

    saveUserRating(state, action) {
      const { movieId, rating } = action.payload;
      state.savedRatings[movieId] = rating;
    },

    addToCompleted(state, action) {
      const movie = action.payload;
      const movieId = movie.imdbID;

      const exists = state.completed.some((item) => item.imdbID === movieId);

      if (exists) return;

      const runtime = Number.parseInt(
        String(movie.Runtime || movie.runtime || "").match(/\d+/)?.[0] || 0,
        10,
      );

      state.completed.push({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        runtime,
        imdbRating: movie.imdbRating || "",
        userRating: state.savedRatings[movieId] || 0,
        isFav: state.fav.some((item) => item.imdbID === movieId),
        isInWatchlist: state.watchlist.some((item) => item.imdbID === movieId),
      });
    },
  },
});

export default profileSlice.reducer;

export const {
  startLoading,
  setLoading,
  setError,
  setOnSearch,
  selectSearch,
  toggleFavorite,
  toggleWatchlist,
  setUserRating,
  saveUserRating,
  addToCompleted,
  openModal,
  closeModal,
} = profileSlice.actions;

export const getSearchmovies = (state) => state.profile.onSearch;
export const getSelectedmovie = (state) => state.profile.selectedMovie;
export const getLoading = (state) => state.profile.loading;
export const getError = (state) => state.profile.error;
export const getFavorites = (state) => state.profile.fav;
export const getWatchlist = (state) => state.profile.watchlist;
export const getUserRatings = (state) => state.profile.userRatings;
export const getSavedRatings = (state) => state.profile.savedRatings;
