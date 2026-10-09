import { Link } from "react-router-dom";
import MovieSearch from "./MovieSearch";
function Navbar() {
return ( <header className="relative z-10 flex flex-wrap items-center justify-between gap-5 border-b border-white/10 bg-[#14181c] px-[5%] py-4 text-white sm:px-[8%]">


  {/* Profile / Home */}
  <Link
    to="/"
    className="flex shrink-0 items-center gap-3"
  >
    {/* Replace this image path with your own image */}
    <img
      src="/imdb.png"
      alt="Home"
      className="h-10 w-10 rounded-full border-2 border-amber-400 object-cover"
    />

    <span className="text-lg font-extrabold tracking-widest text-white transition hover:text-amber-400">
      HOME
    </span>
  </Link>

 <MovieSearch></MovieSearch>

  {/* Navigation */}
  <nav className="flex flex-wrap items-center gap-4 text-xs font-bold tracking-wider sm:gap-6 sm:text-sm">
    <Link
      to="/recentactivity"
      className="whitespace-nowrap text-[#9ab] transition hover:text-amber-400"
    >
      RECENT ACTIVITY
    </Link>

    <Link
      to="/watchlist"
      className="whitespace-nowrap text-[#9ab] transition hover:text-amber-400"
    >
      WATCHLIST
    </Link>

    <Link
      to="/favourites"
      className="whitespace-nowrap text-[#9ab] transition hover:text-amber-400"
    >
      FAVOURITES
    </Link>
  </nav>
</header>


);
}

export default Navbar;
