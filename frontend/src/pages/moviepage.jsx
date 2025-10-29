import React, { useState } from "react";
import MovieForm from "../components/movieform.jsx";
import { createMovie, updateMovie } from "../api/api.js";
import Navbar from "../components/navbar.jsx";

const MoviePage = () => {
  const [editingMovie, setEditingMovie] = useState(null);
  const [movies, setMovies] = useState([]);

  // ✅ Handle save (create or update)
  const handleSaveMovie = async (movie) => {
    try {
      if (editingMovie) {
        const res = await updateMovie(editingMovie._id, movie);
        setMovies((prev) =>
          prev.map((m) => (m._id === editingMovie._id ? res.data : m))
        );
        setEditingMovie(null);
      } else {
        const res = await createMovie(movie);
        setMovies((prev) => {
          if (prev.some((m) => m._id === res.data._id)) return prev;
          return [...prev, res.data];
        });
      }
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => setEditingMovie(null);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="w-full max-w-3xl text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-md">
          {editingMovie ? "Edit Movie" : "Add New Movie"}
        </h1>
        <p className="mt-3 text-gray-400 text-sm">
          {editingMovie
            ? "Update movie details below"
            : "Fill in the details to add a new movie"}
        </p>
      </div>

      {/* Movie Form Section */}
      <div className="w-full max-w-2xl bg-gray-800/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700">
        <MovieForm
          onSubmit={handleSaveMovie}
          movieData={editingMovie}
          onCancel={editingMovie ? handleCancel : null}
        />
      </div>

      {/* Back to Home Button */}
      <div className="mt-8">
        <a
          href="/"
          className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
        >
          ⬅ Back to Home
        </a>
      </div>
    </div>
    </>
    
  );
};

export default MoviePage;
