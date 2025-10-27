import express from "express";
import { createMovie, getMovies, updateMovie, deleteMovie } from "../controllers/authcontroller.js";

const router = express.Router();

// Routes
router.get("/", getMovies);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;



