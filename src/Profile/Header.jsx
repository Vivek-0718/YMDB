function Header() {
  const movies = [
    {
      title: "The Shawshank Redemption",
      image:
        "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      rating: "★★★★★",
      date: "07 Oct",
    },
    {
      title: "The Dark Knight",
      image:
        "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: "★★★★★",
      date: "30 Aug",
    },
    {
      title: "Inception",
      image:
        "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
      rating: "★★★★½",
      date: "04 Aug",
    },
    {
      title: "Interstellar",
      image:
        "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      rating: "★★★★★",
      date: "03 Aug",
    },
    {
      title: "Fight Club",
      image:
        "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      rating: "★★★★½",
      date: "01 Aug",
    },
  ];

  return (
    <>
      {/* Navbar */}
      <header className="flex flex-wrap items-center justify-between gap-6 bg-[#14181c] px-[8%] py-5 text-white">
        {/* Profile */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#293541] text-lg">
            👤
          </div>

          <span className="text-sm font-bold tracking-wide">
            sathish26
          </span>

          <span className="text-[#9ab]">⌄</span>
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
          <a href="#" className="whitespace-nowrap hover:text-white">
            RECENT ACTIVITY
          </a>

          <a href="#" className="whitespace-nowrap hover:text-white">
            WATCHLIST
          </a>

          <a href="#" className="whitespace-nowrap hover:text-white">
            FAVOURITES
          </a>
        </nav>
      </header>

      {/* Movie Activity Section */}
      <main className="min-h-screen bg-[#14181c] px-[8%] py-8 text-white">
        <div className="mx-auto max-w-[1000px]">
          {/* Section Heading */}
          <div className="mb-6 flex items-center justify-between border-b border-[#456] pb-3">
            <h2 className="text-sm font-bold tracking-wider">
              RECENT ACTIVITY
            </h2>

            <button
              type="button"
              className="text-sm text-[#9ab] hover:text-white"
            >
              VIEW ALL →
            </button>
          </div>

          {/* Five Movie Rows */}
          <div className="flex flex-col">
            {movies.map((movie) => (
              <div
                key={movie.title}
                className="flex items-start gap-5 border-b border-[#293541] py-6"
              >
                {/* Movie Poster */}
                <div className="group relative w-32 shrink-0 overflow-hidden rounded-md bg-[#293541] sm:w-40">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    loading="lazy"
                    className="aspect-[2/3] w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Movie Details */}
                <div className="flex min-w-0 flex-1 flex-col gap-3 pt-1 sm:pt-3">
                  <h3 className="text-base font-bold text-white sm:text-xl">
                    {movie.title}
                  </h3>

                  <p className="text-sm text-[#678]">
                    Watched on {movie.date}
                  </p>

                  <div className="text-lg tracking-wider text-[#00c030]">
                    {movie.rating}
                  </div>

                  <p className="text-sm text-[#9ab]">
                    <span className="mr-1 text-red-500">♥</span>
                    Liked
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Header;