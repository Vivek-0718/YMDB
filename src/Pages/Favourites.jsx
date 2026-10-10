import MovieGrid from "../Profile/MovieGrid";

function Favourites() {
  return (
    <>
      <div className="text-white max-w-[1000px]">
        <h1 className="text-2xl mb-4 font-bold">My Favourites</h1>
        <MovieGrid></MovieGrid>
      </div>
    </>
  );
}

export default Favourites;
