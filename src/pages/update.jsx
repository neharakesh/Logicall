import React, { useEffect, useState } from "react";
import { updateMovie, deleteMovie } from "../api/api.js";
import { useNavigate } from "react-router-dom";


const Update = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch movies on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getAllMovies();
        setMovies(res.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // ✅ Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  // ✅ Edit handler
  const handleEdit = (movie) => {
    navigate("/movie", { state: { editingMovie: movie } });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-10">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-lg">
            Manage Your Movies
          </h1>
          <p className="text-gray-400 mt-2">
            View, edit, or delete movies from your collection.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-400">Loading movies...</div>
        ) : movies.length === 0 ? (
          <div className="text-center text-gray-500">No movies found.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold text-purple-400 mb-2">
                  {movie.title}
                </h2>
                <p className="text-gray-300 text-sm">
                  🎬 <strong>Type:</strong> {movie.type}
                </p>
                <p className="text-gray-300 text-sm">
                  🎥 <strong>Director:</strong> {movie.director}
                </p>
                <p className="text-gray-300 text-sm">
                  💰 <strong>Budget:</strong> {movie.budget}
                </p>
                <p className="text-gray-300 text-sm">
                  📍 <strong>Location:</strong> {movie.location}
                </p>
                <p className="text-gray-300 text-sm">
                  ⏳ <strong>Duration:</strong> {movie.duration}
                </p>
                <p className="text-gray-300 text-sm">
                  📅 <strong>Year:</strong> {movie.year}
                </p>
                <p className="text-gray-400 mt-2 text-sm italic">
                  {movie.details}
                </p>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full text-white font-semibold hover:opacity-90 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="bg-red-600 px-4 py-2 rounded-full text-white font-semibold hover:bg-red-700 transition"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Update;

