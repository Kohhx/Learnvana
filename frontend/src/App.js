import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbars/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InstructorSignUp from "./pages/InstructorSignUp";
import StudentSignUp from "./pages/StudentSignUp";
import ProtectedRoute from "./routing/ProtectedRoute";
import Index from "./pages/Index";
import InstructorDashboard from "./pages/InstructorDashboard";
import NewClass from "./pages/NewClass";
import Lessons from "./pages/Lessons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InstructorClass from "./pages/InstructorClass"
import InstructorLesson from "./pages/InstructorLesson"

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
            <Route element={<ProtectedRoute />}>
              <Route path="/users/signup/instructor" element={<InstructorSignUp />} />
              <Route path="/users/signup/student" element={<StudentSignUp />} />
            </Route>
            <Route path="/classes" element={<Index />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/instructors" >
                <Route path="dashboard" element={<InstructorDashboard />} />
                <Route path="classes/new" element={<NewClass />} />
                <Route path="classes/:classId" element={<InstructorClass/>} />
                <Route path="classes/:classId/lessons" element={<Lessons/>} />
                <Route path="classes/:classId/:lessonId" element={<InstructorLesson/>} />
              </Route>
            </Route>
            <Route path="*" element={<div>404 page not found</div>} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
