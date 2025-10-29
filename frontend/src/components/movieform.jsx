import React, { useState, useEffect } from "react";

const MovieForm = ({ onSubmit, movieData, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    director: "",
    budget: "",
    location: "",
    duration: "",
    year: "",
    details: "",
  });

  useEffect(() => {
    if (movieData) setFormData(movieData);
  }, [movieData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.type) {
      alert("Please select a movie type (Movie or TV Show)");
      return;
    }
    onSubmit(formData);
    setFormData({
      title: "",
      type: "",
      director: "",
      budget: "",
      location: "",
      duration: "",
      year: "",
      details: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-gray-300 capitalize mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      {/* Type Dropdown */}
      <div>
        <label className="block text-gray-300 capitalize mb-1">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        >
          <option value="">Select Type</option>
          <option value="Movie">Movie</option>
          <option value="TV Show">TV Show</option>
        </select>
      </div>

      {/* Other Inputs */}
      {["director", "budget", "location", "duration", "year", "details"].map(
        (field) => (
          <div key={field}>
            <label className="block text-gray-300 capitalize mb-1">
              {field}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        )
      )}

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full text-white font-semibold hover:opacity-90 transition-all duration-300"
        >
          {movieData ? "Update Movie" : "Add Movie"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-700 rounded-full text-gray-300 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default MovieForm;
