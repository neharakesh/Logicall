import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", user);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-gray-700 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-8">
          ✨ Create Account
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800/70 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={user.name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800/70 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={user.password}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800/70 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;

