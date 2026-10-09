import { useState } from "react";
import Search from "./Search";
import SearchResults from "./SearchResults";

function MovieSearch() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  function handleSelect(imdbID) {
    setSelectedMovie(imdbID);
    console.log("Selected movie:", imdbID);
  }

  return (
    <div className="relative mx-auto w-full max-w-105">
      <Search />
      <SearchResults onSelect={handleSelect} />

      {selectedMovie && (
        <p className="mt-4 text-sm text-white">
          Selected movie ID: {selectedMovie}
        </p>
      )}
    </div>
  );
}

export default MovieSearch;
