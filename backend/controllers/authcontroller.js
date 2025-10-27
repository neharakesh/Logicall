import Movie from "../models/movie.js";

// ➕ Create a new movie
export const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(400).json({ message: error.message });
  }
};

// 📄 Get all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update movie
export const updateMovie = async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ❌ Delete movie
export const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
