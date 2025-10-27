import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "Signup successful", user });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password)))
      return res.status(400).json({ message: "Invalid credentials" });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
});

export default router;

