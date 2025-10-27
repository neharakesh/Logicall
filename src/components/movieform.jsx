import React, { useState, useEffect } from 'react';

const MovieForm = ({ onSubmit, movieData, onCancel }) => {
  const [movie, setMovie] = useState({
    title: '',
    type: 'Movie',
    director: '',
    budget: '',
    location: '',
    duration: '',
    year: '',
    details: '',
  });

  // Fill form when editing
  useEffect(() => {
    if (movieData) setMovie(movieData);
  }, [movieData]);

  // Update state when user types
  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert budget and year to numbers
    const payload = {
      ...movie,
      budget: Number(movie.budget),
      year: Number(movie.year),
    };

    // Send to parent
    onSubmit(payload);

    // Reset form
    setMovie({
      title: '',
      type: 'Movie',
      director: '',
      budget: '',
      location: '',
      duration: '',
      year: '',
      details: '',
    });
  };

  return (
    <form className="p-4 bg-white rounded shadow space-y-3" onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" value={movie.title} onChange={handleChange} className="input"/>
      <select name="type" value={movie.type} onChange={handleChange} className="input">
        <option>Movie</option>
        <option>TV Show</option>
      </select>
      <input type="text" name="director" placeholder="Director" value={movie.director} onChange={handleChange} className="input"/>
      <input type="number" name="budget" placeholder="Budget" value={movie.budget} onChange={handleChange} className="input"/>
      <input type="text" name="location" placeholder="Location" value={movie.location} onChange={handleChange} className="input"/>
      <input type="text" name="duration" placeholder="Duration" value={movie.duration} onChange={handleChange} className="input"/>
      <input type="number" name="year" placeholder="Year" value={movie.year} onChange={handleChange} className="input"/>
      <textarea name="details" placeholder="Details" value={movie.details} onChange={handleChange} className="input"></textarea>
      <div className="flex space-x-2">
        <button type="submit" className="btn bg-blue-500 text-white">Save</button>
        {onCancel && <button type="button" className="btn bg-gray-300" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default MovieForm;
