import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String },
  year: { type: Number },
  type: { type: String, enum: ["Movie", "Series", "Show"], default: "Movie" },
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;


