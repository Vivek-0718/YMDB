import { useDispatch, useSelector } from "react-redux";
import {
  getSearchmovies,
  getLoading,
  getError,
  selectSearch,
  startLoading,
  setError,
  setLoading,
  openModal,
} from "../profileSlice";

function SearchResults() {
  const apiKey = import.meta.env.VITE_MY_KEY;
  const movies = useSelector(getSearchmovies);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  async function handleSelect(imdbID) {
    try {
      dispatch(startLoading());
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`,
      );
      if (!res.ok) throw new Error("Network error. Please try again later");

      const data = await res.json();
      if (data.Response === "False")
        throw new Error(data.Error || "Movie not found");

      dispatch(selectSearch(data));
      dispatch(openModal({ type: "movieDetails" }));

    } catch (e) {
      dispatch(setError(e.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl bg-[#1c2530] shadow-lg">
      {loading && <p className="p-4 text-sm text-[#9ab]">Loading...</p>}
      {!loading && error && <p className="p-4 text-sm text-red-400">{error}</p>}

      {!loading && !error && movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li
              key={movie.imdbID}
              onClick={() => handleSelect(movie.imdbID)}
              className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-[#293541]"
            >
              {movie.Poster !== "N/A" ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="h-14 w-10 rounded object-cover"
                />
              ) : (
                <div className="flex h-14 w-10 items-center justify-center rounded bg-[#293541] text-xs text-[#9ab]">
                  N/A
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm text-white">{movie.Title}</p>
                <p className="text-xs text-[#9ab]">{movie.Year}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;