import { BrowserRouter, Route, Routes } from "react-router-dom";
import Favourites from "./Pages/Favourites";
import RecentActivity from "./Pages/RecentActivity";
import Watchlist from "./Pages/Watchlist";
import { Provider } from "react-redux";
import { store } from "./store";
import Home from "./Profile/Home";
import MovieModal from "./Pages/MovieModal";
import HomeDisplay from "./Profile/HomeDisplay";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<HomeDisplay />} />
              <Route path="favourites" element={<Favourites />} />
              <Route path="recentactivity" element={<RecentActivity />} />
              <Route path="watchlist" element={<Watchlist />} />
            </Route>
          </Routes>
          <MovieModal />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
