import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./routing/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import New from "./pages/New";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/signup" element={<Signup />} />
            <Route path="/classes" element={<Index />} />
            <Route path="/classes/dashboard" element={<Dashboard />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/classes/new" element={<New />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
