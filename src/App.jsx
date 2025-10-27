import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/home.jsx";
import AddMovie from "./pages/moviepage.jsx";
import PrivateRoute from "./components/privateroute.jsx";
import Update from "./pages/update.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update" element={<Update />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/addmovie"
          element={
            <PrivateRoute>
              <AddMovie />
            </PrivateRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;


