import React, { useEffect, useState } from "react";
import { getMovies, deleteMovie, updateMovie } from "../api/api.js";
import Navbar from "../components/Navbar.jsx";

const Update = () => {
  const [movies, setMovies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  // ✅ Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getMovies();
        setMovies(res.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  // ✅ Handle edit
  const handleEdit = (movie) => {
    setEditingId(movie._id);
    setFormData(movie);
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save updated movie
  const handleSave = async (id) => {
    try {
      await updateMovie(id, formData);
      setMovies((prev) =>
        prev.map((movie) => (movie._id === id ? { ...formData, _id: id } : movie))
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  // ✅ Cancel editing
  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-10 drop-shadow-lg">
            🎬 Manage Your Movie Collection
          </h1>

          {loading ? (
            <div className="text-center text-gray-400 text-lg">Loading movies...</div>
          ) : movies.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">No movies found.</div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {movies.map((movie) => (
                <div
                  key={movie._id}
                  className="bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-lg p-6 hover:shadow-purple-500/30 transition duration-300"
                >
                  {editingId === movie._id ? (
                    <>
                      {/* Editable form */}
                      <div className="space-y-2">
                        {[
                          "title",
                          "type",
                          "director",
                          "budget",
                          "location",
                          "duration",
                          "year",
                          "details",
                        ].map((field) => (
                          <input
                            key={field}
                            name={field}
                            value={formData[field] || ""}
                            onChange={handleChange}
                            placeholder={`Enter ${field}`}
                            className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                          />
                        ))}
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <button
                          onClick={() => handleSave(movie._id)}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-full text-white font-semibold hover:opacity-90 transition"
                        >
                          💾 Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-700 px-4 py-2 rounded-full text-gray-300 hover:bg-gray-600 transition"
                        >
                          ✖ Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Static view */}
                      <h2 className="text-2xl font-semibold text-purple-400 mb-3 truncate">
                        {movie.title}
                      </h2>
                      <div className="text-sm text-gray-300 space-y-1">
                        <p>🎭 <strong>Type:</strong> {movie.type}</p>
                        <p>🎥 <strong>Director:</strong> {movie.director}</p>
                        <p>💰 <strong>Budget:</strong> {movie.budget}</p>
                        <p>📍 <strong>Location:</strong> {movie.location}</p>
                        <p>⏳ <strong>Duration:</strong> {movie.duration}</p>
                        <p>📅 <strong>Year:</strong> {movie.year}</p>
                        <p className="italic text-gray-400 mt-2 line-clamp-2">
                          {movie.details}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <button
                          onClick={() => handleEdit(movie)}
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-full text-white font-semibold hover:opacity-90 transition"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(movie._id)}
                          className="bg-gradient-to-r from-red-500 to-rose-600 px-4 py-2 rounded-full text-white font-semibold hover:opacity-90 transition"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Update;
