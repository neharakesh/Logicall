import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["Movie", "TV Show"], required: true },
  director: String,
  budget: Number,
  location: String,
  duration: String,
  year: Number,
  details: String,
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;



