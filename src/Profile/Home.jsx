import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
function Home() {
  return (
    <>
      <Navbar />
      <main className="mainContent bg-[#14181c] px-[8%] py-8 text-white">
        <Outlet/>
      </main>
    </>
  );
}

export default Home;
