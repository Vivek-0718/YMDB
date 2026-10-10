import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavorite,
  toggleWatchlist,
  rateAndComplete,
  closeModal,
  getFavorites,
  getWatchlist,
  getUserRatings,
  getSelectedmovie,
} from "./../profileSlice";

function MovieModal() {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.profile.modal.isOpen);
  const selectedMovie = useSelector(getSelectedmovie);

  const favorites = useSelector(getFavorites);
  const watchlist = useSelector(getWatchlist);
  const userRatings = useSelector(getUserRatings);

  const onClose = () => dispatch(closeModal());

  if (!isOpen || !selectedMovie) return null;

  const movieId = selectedMovie.imdbID;
  const title = selectedMovie.Title;
  const image = selectedMovie.Poster;
  const year = selectedMovie.Year;
  const director = selectedMovie.Director;
  const duration = selectedMovie.Runtime;
  const genres = selectedMovie.Genre;
  const description = selectedMovie.Plot;

  const isFavorite = favorites.some(
    (movie) => movie.imdbID === movieId,
  );

  const isInWatchlist = watchlist.some(
    (movie) => movie.imdbID === movieId,
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
    dispatch(rateAndComplete({ selectedMovie, rating }));
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
          <section className="w-full min-w-0 sm:max-w-[190px]">
            <div className="group relative overflow-hidden rounded-lg hover:[&>button]:flex">
              <img
                src={image}
                alt={`${title} poster`}
                className="max-h-[47vh] w-full object-contain"
              />

              <button
                type="button"
                onClick={playTrailer}
                className="absolute cursor-pointer inset-0 hidden flex-col items-center justify-center gap-2 bg-black/35 text-white hover:bg-black/50"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2M9.5 16.5v-9l7 4.5z"
                    />
                  </svg>
                </span>
                <span className="font-semibold">Play Trailer</span>
              </button>
            </div>

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
            </div>

            <button
              type="button"
              onClick={() => dispatch(toggleWatchlist(selectedMovie))}
              className="mt-2 w-full rounded-md border border-white/25 px-3 py-2 text-sm font-semibold hover:bg-white/10"
            >
              {isInWatchlist ? "✓ Added to Watchlist" : "+ Add to Watchlist"}
            </button>

            <button
              type="button"
              onClick={() => dispatch(toggleFavorite(selectedMovie))}
              className="mt-2 w-full rounded-md border border-white/25 px-3 py-2 text-sm font-semibold hover:bg-white/10"
            >
              {isFavorite ? (
                <div className="flex items-center justify-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#F44336"
                      d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12"
                    />
                  </svg>{" "}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8"
                    />
                  </svg>{" "}
                </div>
              )}
            </button>
          </section>

          <section className="min-w-0 sm:pt-8">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
              Movie
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
                Plot
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
