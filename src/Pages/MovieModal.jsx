import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavorite,
  toggleWatchlist,
  setUserRating,
  saveUserRating,
  addToCompleted,
  closeModal,
  getFavorites,
  getWatchlist,
  getUserRatings,
  getSavedRatings,
  getSelectedmovie,
} from "./../profileSlice";

function MovieModal() {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.profile.modal.isOpen);
  const selectedMovie = useSelector(getSelectedmovie);

  const favorites = useSelector(getFavorites);
  const watchlist = useSelector(getWatchlist);
  const userRatings = useSelector(getUserRatings);
  const savedRatings = useSelector(getSavedRatings);

  const onClose = () => dispatch(closeModal());

  if (!isOpen || !selectedMovie) return null;

  // Support both your static movie objects and API movie objects.
  const movieId = selectedMovie.imdbID || selectedMovie.title || selectedMovie.Title;
  const title = selectedMovie.title || selectedMovie.Title;
  const image = selectedMovie.image || selectedMovie.Poster;
  const year = selectedMovie.year || selectedMovie.Year;
  const director = selectedMovie.director || selectedMovie.Director;
  const duration = selectedMovie.duration || selectedMovie.Runtime;
  const genres = selectedMovie.genres || selectedMovie.Genre;
  const description = selectedMovie.description || selectedMovie.Plot;

  const isFavorite = favorites.some(
    (movie) => (movie.imdbID || movie.title || movie.Title) === movieId,
  );

  const isInWatchlist = watchlist.some(
    (movie) => (movie.imdbID || movie.title || movie.Title) === movieId,
  );

  const playTrailer = () => {
    const search = encodeURIComponent(title + " official trailer");

    window.open(
      `https://www.youtube.com/results?search_query=${search}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleRating = (rating) => {
    dispatch(setUserRating({ movieId, rating }));
  };

  const handleSaveRating = () => {
    dispatch(
      saveUserRating({
        movieId,
        rating: userRatings[movieId],
      }),
    );
  };

  const handleMarkWatched = () => {
    dispatch(addToCompleted(selectedMovie));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${title} details`}
        className="relative my-auto max-h-[calc(100vh-1.5rem)] w-full max-w-4xl overflow-y-auto rounded-xl border border-white/10 bg-[#14181c] p-4 text-white shadow-2xl sm:max-h-[calc(100vh-2rem)] sm:p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close movie details"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-2xl text-black hover:bg-gray-200"
        >
          ×
        </button>

        <div className="grid grid-cols-1 items-start gap-5 pt-8 sm:grid-cols-[minmax(0,190px)_minmax(0,1fr)] sm:gap-6 sm:pt-2">
          {/* Left: Poster and movie actions */}
          <section className="w-full min-w-0 sm:max-w-[190px]">
            <div className="group relative overflow-hidden rounded-lg">
              <img
                src={image}
                alt={`${title} poster`}
                className="aspect-[2/3] max-h-[34vh] w-full object-cover"
              />

              <button
                type="button"
                onClick={playTrailer}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/35 text-white hover:bg-black/50"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-black">
                  ▶
                </span>
                <span className="font-semibold">Play Trailer</span>
              </button>
            </div>

            <div className="mt-2 rounded-lg border border-white/10 bg-[#20262c] p-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Movie rating
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="text-lg tracking-wide text-amber-400">
                  ★★★★★
                </span>
                <span className="text-sm text-gray-300">5.0/5</span>
              </div>

              <p className="mt-1 text-xs text-gray-500">
                Sample display rating
              </p>
            </div>

            {/* User rating */}
            <div className="mt-2 rounded-lg border border-white/10 bg-[#20262c] p-2.5">
              <p className="text-sm font-semibold">Your rating</p>

              <p className="mt-1 text-xs text-gray-400">
                Choose 1–5 stars, then save.
              </p>

              <div
                className="mt-1 flex items-center gap-1"
                role="radiogroup"
                aria-label="Your movie rating"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    role="radio"
                    aria-checked={userRatings[movieId] === star}
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    onClick={() => handleRating(star)}
                    className={`text-xl transition ${
                      star <= (userRatings[movieId] || 0)
                        ? "text-amber-400"
                        : "text-gray-500 hover:text-amber-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              {userRatings[movieId] && (
                <button
                  type="button"
                  onClick={handleSaveRating}
                  className="mt-2 w-full rounded-md bg-amber-400 px-3 py-1.5 text-sm font-bold text-black hover:bg-amber-300"
                >
                  {savedRatings[movieId] !== undefined
                    ? "Update Rating"
                    : "Save Rating"}
                </button>
              )}

              {savedRatings[movieId] !== undefined && (
                <p className="mt-2 text-xs text-green-400">
                  Saved: {savedRatings[movieId]} / 5 stars
                </p>
              )}
            </div>

            {/* Watchlist */}
            <button
              type="button"
              onClick={() => dispatch(toggleWatchlist(selectedMovie.imdbID))}
              className="mt-2 w-full rounded-md border border-white/25 px-3 py-2 text-sm font-semibold hover:bg-white/10"
            >
              {isInWatchlist ? "✓ Added to Watchlist" : "+ Add to Watchlist"}
            </button>

            {/* Favorites */}
            <button
              type="button"
              onClick={() => dispatch(toggleFavorite(selectedMovie))}
              className="mt-2 w-full rounded-md border border-white/25 px-3 py-2 text-sm font-semibold hover:bg-white/10"
            >
              {isFavorite ? "♥ Remove Favorite" : "♡ Add to Favorites"}
            </button>

            {/* Completed movies */}
            <button
              type="button"
              onClick={handleMarkWatched}
              className="mt-2 w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold hover:bg-green-500"
            >
              ✓ Mark as Watched
            </button>
          </section>

          {/* Right: Movie details */}
          <section className="min-w-0 sm:pt-8">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
              Featured movie
            </p>

            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              {title}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-300">
              {year && <span>{year}</span>}
              {year && duration && <span className="text-gray-500">•</span>}
              {duration && <span>{duration}</span>}
              {genres && (
                <>
                  <span className="text-gray-500">•</span>
                  <span>{genres}</span>
                </>
              )}
            </div>

            <div className="mt-4 border-t border-white/10 pt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Directed by
              </p>

              <p className="mt-1 text-base font-medium">
                {director || "Director information unavailable"}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Synopsis
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-200">
                {description || "No synopsis available."}
              </p>
            </div>

            {genres && (
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-400">
                <span className="rounded border border-white/15 px-2 py-1">
                  HD
                </span>

                <span className="rounded border border-white/15 px-2 py-1">
                  {genres}
                </span>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
