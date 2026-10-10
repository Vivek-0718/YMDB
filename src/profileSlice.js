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

      state.selectedMovie = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        runtime: movie.Runtime,
        imdbRating: movie.imdbRating || "",
        userRating: state.userRatings[movieId] || 0,
        isFav: state.fav.some((item) => item.imdbID === movieId),
        Plot: movie.Plot,
        isInWatchlist: state.watchlist.some((item) => item.imdbID === movieId),
      };
    },

    openModal: (state, action) => {
      state.modal.isOpen = true;
      state.modal.type = action.payload.type;
    },
    closeModal: (state) => {
      state.modal = { isOpen: false, type: null, props: {} };
      state.selectedMovie = {};
    },

    toggleFavorite(state, action) {
      const movie = action.payload;
      const movieId = movie.imdbID;

      const exists = state.fav.some((item) => item.imdbID === movieId);

      state.fav = exists
        ? state.fav.filter((item) => item.imdbID !== movieId)
        : [...state.fav, { ...movie, isFav: true }];
      state.selectedMovie.isFav = !exists;
    },

    toggleWatchlist(state, action) {
      const movie = action.payload;
      const movieId = movie.imdbID;

      const exists = state.watchlist.some((item) => item.imdbID === movieId);

       state.watchlist = exists
         ? state.watchlist.filter((item) => item.imdbID !== movieId)
         : [...state.watchlist, { ...movie, isInWatchlist: true }];
       state.selectedMovie.isInWatchlist = !exists;
    },

    rateAndComplete(state, action) {
      const { selectedMovie, rating } = action.payload;
      const movieId = selectedMovie.imdbID;

      state.userRatings[movieId] = rating;

      const existing = state.completed.find((item) => item.imdbID === movieId);
      if (existing) {
        existing.userRating = rating;
        return;
      }

      state.completed.push({
        imdbID: movieId,
        Title: selectedMovie.Title,
        Year: selectedMovie.Year,
        Poster: selectedMovie.Poster,
        runtime: selectedMovie.Runtime,
        imdbRating: selectedMovie.imdbRating || "",
        userRating: rating,
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
  rateAndComplete,
  openModal,
  closeModal,
} = profileSlice.actions;

export const getSearchmovies = (state) => state.profile.onSearch;
export const getSelectedmovie = (state) => state.profile.selectedMovie;
export const getLoading = (state) => state.profile.loading;
export const getError = (state) => state.profile.error;
export const getFavorites = (state) => state.profile.fav;
export const getWatchlist = (state) => state.profile.watchlist;
export const getCompleted = (state) => state.profile.completed;
export const getUserRatings = (state) => state.profile.userRatings;
