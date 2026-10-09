import { useSelector } from "react-redux";
import { getSearchmovies, getLoading, getError } from "../profileSlice";


function SearchResults({ onSelect }) {
  const movies = useSelector(getSearchmovies);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl bg-[#1c2530] shadow-lg ">
      {loading && <p className="p-4 text-sm text-[#9ab]">Loading...</p>}

      {!loading && error && <p className="p-4 text-sm text-red-400">{error}</p>}

      {!loading && !error && movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li
              key={movie.imdbID}
              onClick={() => onSelect(movie.imdbID)}
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
                <p className="text-xs text-[#9ab]">
                  {movie.Year}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
