import Search from "./Search";
import SearchResults from "./SearchResults";

function MovieSearch() {
  return (
    <div className="relative mx-auto w-full max-w-105">
      <Search />
      <SearchResults />
    </div>
  );
}

export default MovieSearch;
