import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";


function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [savedRatings, setSavedRatings] = useState({});

  // Prevent the page behind the movie popup from scrolling.
  useEffect(() => {
    document.body.style.overflow = selectedMovie ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMovie]);

  const movies = [
    {
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      image:
        "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      rating: "★★★★★",
      date: "07 Oct",
      year: 1994,
      match: "98% match",
      duration: "2h 22m",
      description:
        "Two imprisoned men bond over many years, finding hope and friendship in difficult circumstances.",
      genres: "Drama, Crime",
    },
    {
      title: "The Dark Knight",
      director: "Christopher Nolan",
      image:
        "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: "★★★★★",
      date: "30 Aug",
      year: 2008,
      match: "96% match",
      duration: "2h 32m",
      description:
        "Batman faces a dangerous criminal who brings chaos to Gotham City.",
      genres: "Action, Crime, Drama",
    },
    {
      title: "Inception",
      director: "Christopher Nolan",
      image:
        "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
      rating: "★★★★½",
      date: "04 Aug",
      year: 2010,
      match: "95% match",
      duration: "2h 28m",
      description:
        "A skilled thief enters people's dreams to steal secrets and takes on an unusual mission.",
      genres: "Sci-Fi, Action, Thriller",
    },
    {
      title: "Interstellar",
      director: "Christopher Nolan",
      image:
        "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      rating: "★★★★★",
      date: "03 Aug",
      year: 2014,
      match: "97% match",
      duration: "2h 49m",
      description:
        "A team of explorers travels through space searching for a future for humanity.",
      genres: "Sci-Fi, Adventure, Drama",
    },
    {
      title: "Fight Club",
      director: "David Fincher",
      image:
        "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      rating: "★★★★½",
      date: "01 Aug",
      year: 1999,
      match: "94% match",
      duration: "2h 19m",
      description:
        "An office worker meets a mysterious man, and their secret club changes his life.",
      genres: "Drama, Thriller",
    },
  ];

  const toggleWatchlist = (movie) => {
    setWatchlist((previous) =>
      previous.includes(movie.title)
        ? previous.filter((title) => title !== movie.title)
        : [...previous, movie.title]
    );
  };

  const toggleLike = (movie) => {
    setLikedMovies((previous) =>
      previous.includes(movie.title)
        ? previous.filter((title) => title !== movie.title)
        : [...previous, movie.title]
    );
  };

  const playTrailer = (movie) => {
    const search = encodeURIComponent(movie.title + " official trailer");
    window.open(
      `https://www.youtube.com/results?search_query=${search}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      {/* Navbar */}
      <Navbar/>
      

      {/* Movie Section */}
      <main className="min-h-screen bg-[#14181c] px-[8%] py-8 text-white">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-6 flex items-center justify-between border-b border-[#456] pb-3">
            <h2 className="text-sm font-bold tracking-wider">
              RECENT ACTIVITY
            </h2>

            <Link
              to="/recentactivity"
              className="text-sm text-[#9ab] hover:text-white"
            >
              VIEW ALL →
            </Link>
          </div>

          {/* Horizontal Movie Section - Posters Only */}
<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
  {movies.map((movie) => (
    <button
      key={movie.title}
      type="button"
      onClick={() => setSelectedMovie(movie)}
      aria-label={`View ${movie.title} details`}
      className="block w-full overflow-hidden rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#9ab]"
    >
      <img
        src={movie.image}
        alt={movie.title}
        loading="lazy"
        className="aspect-[2/3] w-full rounded-md object-cover"
      />
    </button>
  ))}
</div>
        </div>
      </main>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/85 p-3 sm:p-4"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedMovie.title} details`}
            className="relative max-h-[calc(100vh-1.5rem)] w-full max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-[#14181c] p-4 text-white shadow-2xl sm:max-h-[calc(100vh-2rem)] sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedMovie(null)}
              aria-label="Close movie details"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-2xl text-black hover:bg-gray-200"
            >
              ×
            </button>

            <div className="grid grid-cols-[minmax(0,190px)_minmax(0,1fr)] items-start gap-5 pt-5 sm:gap-6 md:pt-1">
              {/* LEFT: Original poster, play, movie rating, user rating, save and watchlist */}
              <section className="w-full min-w-0 max-w-[190px]">
                <div className="group relative overflow-hidden rounded-lg">
                  <img
                    src={selectedMovie.image}
                    alt={`${selectedMovie.title} poster`}
                    className="aspect-[2/3] max-h-[34vh] w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => playTrailer(selectedMovie)}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/35 text-white transition hover:bg-black/50"
                    aria-label={`Play ${selectedMovie.title} trailer`}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-black shadow-lg">
                      ▶
                    </span>
                    <span className="font-semibold">Play Trailer</span>
                  </button>
                </div>

                <div className="mt-2 rounded-lg border border-white/10 bg-[#20262c] p-2.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Movie rating
                  </p>
                  <div className="mt-0.5 flex items-center gap-2" aria-label="Movie rating: 5 out of 5 (sample display)">
                    <span className="text-lg tracking-wide text-amber-400">★★★★★</span>
                    <span className="text-sm text-gray-300">5.0/5</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Sample display rating
                  </p>
                </div>

                <div className="mt-2 rounded-lg border border-white/10 bg-[#20262c] p-2.5">
                  <p className="text-sm font-semibold">Your rating</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Choose 1–5 stars, then save your rating.
                  </p>
                  <div className="mt-1 flex items-center gap-1" role="radiogroup" aria-label="Your movie rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        role="radio"
                        aria-checked={userRatings[selectedMovie.title] === star}
                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                        onClick={() =>
                          setUserRatings((previous) => ({
                            ...previous,
                            [selectedMovie.title]: star,
                          }))
                        }
                        className={`text-xl transition ${
                          star <= (userRatings[selectedMovie.title] || 0)
                            ? "text-amber-400"
                            : "text-gray-500 hover:text-amber-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  {userRatings[selectedMovie.title] && (
                    <button
                      type="button"
                      onClick={() =>
                        setSavedRatings((previous) => ({
                          ...previous,
                          [selectedMovie.title]: userRatings[selectedMovie.title],
                        }))
                      }
                      className="mt-2 w-full rounded-md bg-amber-400 px-3 py-1.5 text-sm font-bold text-black transition hover:bg-amber-300"
                    >
                      {savedRatings[selectedMovie.title] !== undefined
                        ? "Update Rating"
                        : "Save Rating"}
                    </button>
                  )}

                  {savedRatings[selectedMovie.title] !== undefined && (
                    <p className="mt-2 text-xs text-green-400">
                      Saved: {savedRatings[selectedMovie.title]} / 5 stars
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => toggleWatchlist(selectedMovie)}
                  className="mt-2 w-full rounded-md border border-white/25 bg-transparent px-3 py-2 text-sm font-semibold transition hover:bg-white/10"
                >
                  {watchlist.includes(selectedMovie.title)
                    ? "✓ Added to Watchlist"
                    : "+ Add to Watchlist"}
                </button>
              </section>

              {/* RIGHT: Movie information */}
              <section className="min-w-0 md:pt-8">
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
                  Featured movie
                </p>
                <h2 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
                  {selectedMovie.title}
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-300">
                  <span>{selectedMovie.year}</span>
                  <span className="text-gray-500">•</span>
                  <span>{selectedMovie.duration}</span>
                  <span className="text-gray-500">•</span>
                  <span>{selectedMovie.genres}</span>
                </div>

                <div className="mt-4 border-t border-white/10 pt-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Directed by
                  </p>
                  <p className="mt-1 text-base font-medium text-white">
                    {selectedMovie.director || "Director information unavailable"}
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Synopsis
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-200">
                    {selectedMovie.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-400">
                  <span className="rounded border border-white/15 px-2 py-1">HD</span>
                  <span className="rounded border border-white/15 px-2 py-1">
                    {selectedMovie.genres}
                  </span>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;