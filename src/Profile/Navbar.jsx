import { NavLink } from "react-router-dom";
import MovieSearch from "./MovieSearch";
function Navbar() {
  return (
    <header className="navbar relative z-10 flex flex-wrap items-center justify-between gap-5 border-b border-white/10 bg-[#14181c] px-[5%] py-4 text-white sm:px-[8%]">
      <NavLink to="/" className="flex shrink-0 items-center gap-3">
        <img
          src="/ymdb.png"
          alt="Home"
          className="w-15 rounded-full border-2 border-amber-400 object-cover"
        />
      </NavLink>

      <MovieSearch></MovieSearch>

      <nav className="flex flex-wrap items-center gap-4 text-xs font-bold tracking-wider sm:gap-6 sm:text-sm">
        <NavLink
          to="/recentactivity"
          className="whitespace-nowrap text-[#9ab] transition hover:text-amber-400"
        >
          RECENT ACTIVITY
        </NavLink>

        <NavLink
          to="/watchlist"
          className="whitespace-nowrap text-[#9ab] transition hover:text-amber-400"
        >
          WATCHLIST
        </NavLink>

        <NavLink
          to="/favourites"
          className="whitespace-nowrap text-[#9ab] transition hover:text-amber-400"
        >
          FAVOURITES
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
