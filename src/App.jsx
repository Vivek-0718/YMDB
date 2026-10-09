import { BrowserRouter, Route, Routes } from "react-router-dom";
import Favourites from "./Pages/Favourites";
import RecentActivity from "./Pages/RecentActivity";
import Watchlist from "./Pages/Watchlist";

function App() {
  return (
    <>
      <h1 className="font-bold">Hello</h1>
      <BrowserRouter>
      <Routes>
        
      <Route path='favourites' element={<Favourites></Favourites>}/>
      <Route path='recentactivity' element={<RecentActivity></RecentActivity>}/>
      <Route path='watchlist' element={<Watchlist></Watchlist>}/>



        


      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
