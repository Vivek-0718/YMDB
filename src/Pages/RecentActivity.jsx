import MovieGrid from "../Profile/MovieGrid";

function RecentActivity() {
    return (
      <>
        <div className="text-white max-w-[1000px]">
          <h1 className="text-2xl mb-4 font-bold">Recent Activity</h1>
          <MovieGrid></MovieGrid>
        </div>
      </>
    );
}

export default RecentActivity
