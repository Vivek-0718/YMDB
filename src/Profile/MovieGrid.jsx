import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCompleted, getFavorites, getWatchlist, openModal, selectSearch, setLoading } from "../profileSlice";

function MovieGrid({ type }) {
  const apiKey = import.meta.env.VITE_MY_KEY;
  const dispatch = useDispatch();

  const favMovies = useSelector(getFavorites);
  const watchlistMovies = useSelector(getWatchlist);
  const completedMovies = useSelector(getCompleted);

  const { pathname } = useLocation();
  let movies = null;
  if (pathname == "/") {
    if (type == "recentactivity") {
      movies = completedMovies.slice(0, 5);
    } else if (type == "fav5") {
      movies = favMovies.slice(0, 5);
    }
  } else if (pathname == "/favourites") {
    movies = favMovies;
  } else if (pathname == "/recentactivity") {
    movies = completedMovies;
  } else if (pathname == "/watchlist") {
    movies = watchlistMovies;
  }
  async function handleSelect(imdbID) {
    try {
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
      console.log(e.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
  return (
    <>
      <div className="mx-auto">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.length ? movies.map((movie) => (
            <button
              key={movie.imdbID}
              type="button"
              onClick={() => handleSelect(movie.imdbID)}
              className="block w-full overflow-hidden rounded-md bg-transparent hover:opacity-75 cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-[#9ab]"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                loading="lazy"
                className="aspect-[2/3] w-full rounded-md object-cover"
              />
            </button>
          ))
            :
            <p className="text-gray-400
            ">No Movies in this list.</p>
        }
        </div>
      </div>
    </>
  );
}

export default MovieGrid;
