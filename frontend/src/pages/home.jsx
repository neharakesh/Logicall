import React, { useEffect, useState } from "react";
import { getMovies } from "../api/api.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/navbar.jsx";  

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMovies();
        setMovies(res.data.movies || res.data || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };

  return (
    <><Navbar />
    
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <header className="py-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wide drop-shadow-lg">
          🎬 Favorite Movies & TV Shows
        </h1>
        <p className="text-gray-300 mt-2 text-lg">
          Explore your favorite titles and discover new ones!
        </p>
      </header>

      <div className="max-w-4xl mx-auto mt-6 rounded-lg overflow-hidden shadow-2xl">
        <Slider {...settings}>
          {movies.slice(0, 5).map((movie) => (
            <div key={movie._id} className="relative">
              <img
                src={`https://picsum.photos/seed/${movie.title}/900/400`}
                alt={movie.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col text-center p-4">
                <h2 className="text-3xl font-bold text-yellow-300">
                  {movie.title}
                </h2>
                <p className="text-gray-200 mt-2 italic">{movie.director}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <section className="max-w-6xl mx-auto mt-10 px-6">
        <h2 className="text-3xl font-semibold mb-4 border-l-4 border-yellow-400 pl-3">
          🎥 Recently Added Movies
        </h2>

        {movies.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">No movies found 😢</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={`https://picsum.photos/seed/${movie.title}/400/250`}
                  alt={movie.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-1">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-1">
                    🎬 {movie.type} | 📅 {movie.year}
                  </p>
                  <p className="text-sm text-gray-300">
                    Director: {movie.director || "Unknown"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="text-center text-gray-400 mt-10 pb-6 text-sm">
        © {new Date().getFullYear()} Movie Explorer | Made with ❤️ by Neha Rajpoot
      </footer>
    </div>
    </>
  );
};

export default Home;
