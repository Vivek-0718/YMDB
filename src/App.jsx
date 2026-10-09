import { BrowserRouter, Route, Routes } from "react-router-dom";
import Favourites from "./Pages/Favourites";
import RecentActivity from "./Pages/RecentActivity";
import Watchlist from "./Pages/Watchlist";
import { Provider } from "react-redux";
import { store } from "./store";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="favourites" element={<Favourites></Favourites>} />
            <Route
              path="recentactivity"
              element={<RecentActivity></RecentActivity>}
            />
            <Route path="watchlist" element={<Watchlist></Watchlist>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
