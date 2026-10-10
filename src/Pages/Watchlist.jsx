import MovieGrid from "../Profile/MovieGrid";

function Watchlist() {
  return (
    <>
      <div className="text-white max-w-[1000px]">
        <h1 className="text-2xl mb-4 font-bold">My Watchlist . { }</h1>
        <MovieGrid></MovieGrid>
      </div>
    </>
  );
}

export default Watchlist;
