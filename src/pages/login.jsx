import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", user);
      localStorage.setItem("token", res.data.token);
      navigate("/"); // redirect to homepage
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/40">
        <h1 className="text-3xl font-bold text-center text-white drop-shadow-md mb-8">
          🔐 Welcome Back
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            value={user.email}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="🔑 Password"
            value={user.password}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none"
          />

          {error && <p className="text-red-200 text-center text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-xl text-white font-semibold shadow-md bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-white/90 text-sm mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-yellow-300 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

