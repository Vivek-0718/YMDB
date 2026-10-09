import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {

  // useEffect(() => {
  //   document.body.style.overflow = selectedMovie ? "hidden" : "";

  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [selectedMovie]);

  const movies = [
    {
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      image: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      rating: "★★★★★",
      date: "07 Oct",
      year: 1994,
      match: "98% match",
      duration: "2h 22m",
      description:
        "Two imprisoned men bond over many years, finding hope and friendship in difficult circumstances.",
      genres: "Drama, Crime",
    },
    {
      title: "The Dark Knight",
      director: "Christopher Nolan",
      image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: "★★★★★",
      date: "30 Aug",
      year: 2008,
      match: "96% match",
      duration: "2h 32m",
      description:
        "Batman faces a dangerous criminal who brings chaos to Gotham City.",
      genres: "Action, Crime, Drama",
    },
    {
      title: "Inception",
      director: "Christopher Nolan",
      image: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
      rating: "★★★★½",
      date: "04 Aug",
      year: 2010,
      match: "95% match",
      duration: "2h 28m",
      description:
        "A skilled thief enters people's dreams to steal secrets and takes on an unusual mission.",
      genres: "Sci-Fi, Action, Thriller",
    },
    {
      title: "Interstellar",
      director: "Christopher Nolan",
      image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      rating: "★★★★★",
      date: "03 Aug",
      year: 2014,
      match: "97% match",
      duration: "2h 49m",
      description:
        "A team of explorers travels through space searching for a future for humanity.",
      genres: "Sci-Fi, Adventure, Drama",
    },
    {
      title: "Fight Club",
      director: "David Fincher",
      image: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      rating: "★★★★½",
      date: "01 Aug",
      year: 1999,
      match: "94% match",
      duration: "2h 19m",
      description:
        "An office worker meets a mysterious man, and their secret club changes his life.",
      genres: "Drama, Thriller",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#14181c] px-[8%] py-8 text-white">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-6 flex items-center justify-between border-b border-[#456] pb-3">
            <h2 className="text-sm font-bold tracking-wider">
              RECENT ACTIVITY
            </h2>

            <Link
              to="/recentactivity"
              className="text-sm text-[#9ab] hover:text-white"
            >
              VIEW ALL →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <button
                key={movie.title}
                type="button"
                // onClick={() => setSelectedMovie(movie)}
                aria-label={`View ${movie.title} details`}
                className="block w-full overflow-hidden rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#9ab]"
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  loading="lazy"
                  className="aspect-[2/3] w-full rounded-md object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;