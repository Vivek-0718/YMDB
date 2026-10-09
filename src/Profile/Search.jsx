import { useEffect, useState } from "react";
import { setError, setLoading, setOnSearch, startLoading } from "../profileSlice";
import { useDispatch } from "react-redux";

function Search() {
  const apiKey = import.meta.env.VITE_MY_KEY;
  const [searchValue, setsearchValue] = useState("");
  const dispatch = useDispatch();
  function handleSearch(e) {
    setsearchValue(e);
  }
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        dispatch(startLoading());

        let res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchValue}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Something wrong. Please try again later");
        let data = await res.json();

        if (data.Response === "False") throw new Error("No results");
        dispatch(setOnSearch(data.Search));
      } catch (err) {
        if (err.name !== "AbortError") {
          dispatch(setError(err.message));
          dispatch(setOnSearch([]));
        };
      } finally {
        dispatch(setLoading(false));
      }
    }

    if (!searchValue) {
      dispatch(setOnSearch([]));
      dispatch(setError(""));
      return;
    }

    const timer = setTimeout(() => fetchMovies(), 400);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [searchValue, apiKey, dispatch]);
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="flex w-full items-center gap-3 rounded-full bg-[#293541] px-4 py-2 text-[#9ab]">
          <span className="text-xl">⌕</span>
          <input
            type="text"
            placeholder="Search films..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#9ab]"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default Search;
