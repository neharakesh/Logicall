import express from 'express';
import Movie from '../models/movie.js';

const router = express.Router();

// ➕ Add a new movie
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📜 Get movies with pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const movies = await Movie.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Movie.countDocuments();
    res.json({ movies, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✏️ Update a movie
router.put('/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ❌ Delete a movie
router.delete('/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
