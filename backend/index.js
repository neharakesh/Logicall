import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import movieRoutes from "./routes/movies.js";
import authRoutes from "./routes/authroute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB Error:", err));

// ✅ Routes
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("API running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
