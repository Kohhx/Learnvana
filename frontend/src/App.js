import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar"
import Register from "./components/Register"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"

const App = () => {
  return (
    <Router>
      <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/login" element={[<Login />]} />
            <Route path="/users/signup" element={[<Signup />, <Register />]} />
          </Routes>
      </div>
    </Router>

  );
};

export default App;
