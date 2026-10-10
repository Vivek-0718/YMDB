import { Link } from "react-router-dom";
import MovieGrid from "./MovieGrid";

function HomeDisplay() {
  return (
    <>
      <div className="mb-6">
        <div className="mb-6 flex items-center justify-between border-b border-[#456] pb-3">
          <div className="text-xl font-bold tracking-wider">My Fav 5</div>
          <Link
            to="/favourites"
            className="text-sm text-[#9ab] hover:text-white"
          >
            VIEW ALL →
          </Link>
        </div>
        <MovieGrid type="fav5"></MovieGrid>
      </div>
      <div className="mb-6">
        <div className="mb-6 flex items-center justify-between border-b border-[#456] pb-3">
          <h2 className="text-xl font-bold tracking-wider">Recent Activity</h2>

          <Link
            to="/recentactivity"
            className="text-sm text-[#9ab] hover:text-white"
          >
            VIEW ALL →
          </Link>
        </div>
        <MovieGrid type="recentactivity"></MovieGrid>
      </div>
    </>
  );
}

export default HomeDisplay;
