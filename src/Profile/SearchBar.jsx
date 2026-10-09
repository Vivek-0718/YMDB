import { useDispatch, useSelector } from "react-redux";
import { addToCompleted, getCompleted } from "../profileSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const completedMovies = useSelector(getCompleted);
  return (
    <>
      {completedMovies.map((movie, i) => {
        return <p key={i}>{movie}</p>;
      })}
      <button
        className="bg-amber-200 m-2 p-5"
        onClick={() => dispatch(addToCompleted(1))}
      >
        +
      </button>
    </>
  );
}

export default SearchBar;
