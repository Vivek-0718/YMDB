import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

  const movies = [
    {
      title: "The Shawshank Redemption",
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
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-6 bg-[#14181c] px-[8%] py-5 text-white">
        {/* Profile */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#293541] text-lg">
            👤
          </div>

          <Link
            to="/header"
            className="text-sm font-bold tracking-wide hover:text-white"
          >
            sathish26
          </Link>

          <span className="text-[#9ab]"></span>
        </div>

        {/* Search */}
        <div className="mx-4 flex flex-1 justify-center">
          <div className="flex w-full max-w-md items-center gap-3 rounded-full bg-[#293541] px-4 py-2 text-[#9ab]">
            <span className="text-xl">⌕</span>

            <input
              type="text"
              placeholder="Search films, members..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#9ab]"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex shrink-0 flex-wrap items-center gap-6 text-sm font-bold text-[#9ab]">
          <Link
            to="/recentactivity"
            className="whitespace-nowrap hover:text-white"
          >
            RECENT ACTIVITY
          </Link>

          <Link
            to="/watchlist"
            className="whitespace-nowrap hover:text-white"
          >
            WATCHLIST
          </Link>

          <Link
            to="/favourites"
            className="whitespace-nowrap hover:text-white"
          >
            FAVOURITES
          </Link>
        </nav>
      </header>

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

          {/* Movie Rows */}
          <div className="flex flex-col">
            {movies.map((movie) => (
              <div
                key={movie.title}
                className="flex items-start gap-5 border-b border-[#293541] py-6"
              >
                {/* Click Poster to Open Modal */}
                <button
                  type="button"
                  onClick={() => setSelectedMovie(movie)}
                  aria-label={`View ${movie.title} details`}
                  className="group w-32 shrink-0 overflow-hidden rounded-md bg-[#293541] sm:w-40"
                >
                  <img
                    src={movie.image}
                    alt={movie.title}
                    loading="lazy"
                    className="aspect-[2/3] w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </button>

                {/* Movie Details */}
                <div className="flex min-w-0 flex-1 flex-col gap-3 pt-1 sm:pt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMovie(movie)}
                    className="text-left text-base font-bold text-white hover:text-[#00c030] sm:text-xl"
                  >
                    {movie.title}
                  </button>

                  <p className="text-sm text-[#678]">
                    Watched on {movie.date}
                  </p>

                  <div className="text-lg tracking-wider text-[#00c030]">
                    {movie.rating}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleLike(movie)}
                    className={`w-fit text-sm ${
                      likedMovies.includes(movie.title)
                        ? "text-red-500"
                        : "text-[#9ab]"
                    }`}
                  >
                    ♥ {likedMovies.includes(movie.title) ? "Liked" : "Like"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedMovie.title} details`}
            className="relative my-auto max-h-[92vh] w-full max-w-[1000px] overflow-y-auto rounded-xl bg-[#181818] text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Background Image */}
            <div className="relative min-h-[400px] overflow-hidden sm:min-h-[480px]">
              <img
                src={selectedMovie.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-top"
              />

              {/* Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/20" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedMovie(null)}
                aria-label="Close movie details"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-3xl hover:bg-white hover:text-black"
              >
                ×
              </button>

              {/* Movie Information */}
              <div className="relative flex min-h-[400px] flex-col justify-end p-6 sm:min-h-[480px] sm:p-12">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                  Featured movie
                </p>

                <h2 className="mb-4 max-w-2xl text-3xl font-extrabold uppercase sm:text-5xl">
                  {selectedMovie.title}
                </h2>

                {/* Action Buttons */}
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => playTrailer(selectedMovie)}
                    className="flex items-center gap-2 rounded-md bg-white px-6 py-3 font-bold text-black hover:bg-gray-200"
                  >
                    <span className="text-xl">▶</span>
                    Play
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWatchlist(selectedMovie)}
                    aria-label="Add to watchlist"
                    className="flex h-11 w-11 items-center justify-center rounded-md border border-white/60 bg-black/40 text-2xl hover:bg-white/20"
                  >
                    {watchlist.includes(selectedMovie.title) ? "✓" : "+"}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleLike(selectedMovie)}
                    aria-label="Like movie"
                    className={`flex h-11 w-11 items-center justify-center rounded-md border border-white/60 bg-black/40 text-xl hover:bg-white/20 ${
                      likedMovies.includes(selectedMovie.title)
                        ? "text-red-500"
                        : "text-white"
                    }`}
                  >
                    ♥
                  </button>
                </div>

                {/* Match, Year and Rating */}
                <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
                  <span className="font-bold text-green-400">
                    {selectedMovie.match}
                  </span>

                  <span>{selectedMovie.year}</span>

                  <span>{selectedMovie.duration}</span>

                  <span className="rounded border border-gray-500 px-1 text-xs">
                    HD
                  </span>
                </div>

                <div className="mb-5 text-sm text-gray-300">
                  <span className="mr-3 rounded border border-gray-400 px-2 py-1">
                    13+
                  </span>
                  <span>{selectedMovie.genres}</span>
                </div>

                {/* Description */}
                <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
                  <p className="max-w-2xl text-sm leading-6 text-gray-200 sm:text-base">
                    {selectedMovie.description}
                  </p>

                  <div className="text-sm text-gray-400">
                    <p className="mb-2">
                      <span className="text-gray-500">Title: </span>
                      {selectedMovie.title}
                    </p>

                    <p className="mb-2">
                      <span className="text-gray-500">Release year: </span>
                      {selectedMovie.year}
                    </p>

                    <p>
                      <span className="text-gray-500">Your rating: </span>
                      <span className="text-green-400">
                        {selectedMovie.rating}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;