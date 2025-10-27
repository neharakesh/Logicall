import React, { useState, useEffect } from "react";

const MovieForm = ({ onSubmit, movieData, onCancel }) => {
  const [movie, setMovie] = useState({
    title: "",
    type: "Movie",
    director: "",
    budget: "",
    location: "",
    duration: "",
    year: "",
    details: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  // ✅ Pre-fill data in edit mode
  useEffect(() => {
    if (movieData) setMovie(movieData);
  }, [movieData]);

  // ✅ Input change handler
  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  // ✅ Submit handler with save guard
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return; // ⛔ prevent double submission
    setIsSaving(true);

    const payload = {
      ...movie,
      budget: Number(movie.budget),
      year: Number(movie.year),
    };

    await onSubmit(payload); // wait until parent handles it
    setIsSaving(false);

    // Reset form only when adding (not editing)
    if (!movieData) {
      setMovie({
        title: "",
        type: "Movie",
        director: "",
        budget: "",
        location: "",
        duration: "",
        year: "",
        details: "",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6 border border-gray-200">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        🎬 Favorite Movies & TV Shows
      </h1>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={movie.title}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <select
          name="type"
          value={movie.type}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option>Movie</option>
          <option>TV Show</option>
        </select>

        <input
          type="text"
          name="director"
          placeholder="Director"
          value={movie.director}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={movie.budget}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={movie.location}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={movie.duration}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={movie.year}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <textarea
          name="details"
          placeholder="Details"
          value={movie.details}
          onChange={handleChange}
          rows="3"
          className="md:col-span-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        ></textarea>

        <div className="flex gap-3 mt-2 md:col-span-2 justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-5 py-2 rounded-md text-white font-medium transition-all duration-200 ${
              isSaving
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
