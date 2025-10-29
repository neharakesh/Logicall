import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/home.jsx";
import AddMovie from "./pages/moviepage.jsx";
import PrivateRoute from "./components/privateroute.jsx";
import Update from "./pages/update.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
       


        <Route
          path="/addmovie"
          element={
            <PrivateRoute>
              <AddMovie />
            </PrivateRoute>
          }
        />
        <Route
          path="/update"
          element={
            <PrivateRoute>
              <Update />
            </PrivateRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;


