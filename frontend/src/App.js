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
import Dashboard from "./pages/Dashboard";
import New from "./pages/New";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InstructorClass from "./pages/InstructorClass";
import ClassInvite from "./pages/ClassInvite";
import LessonCreate from "./pages/LessonCreate";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            {/* User Login */}
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/users/signup/instructor"
                element={<InstructorSignUp />}
              />
              <Route path="/users/signup/student" element={<StudentSignUp />} />
            </Route>

            {/* Classes */}
            <Route path="/classes" element={<Index />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/classes/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/classes/new" element={<New />} />
            </Route>
            {/* <Route element={<ProtectedRoute />}>
              <Route path="/classes/:classId" element={<InstructorClass/>} />
            </Route> */}

            {/* Example of nested route with layout */}
            <Route element={<ProtectedRoute />}>
              <Route path="/classes/:classId" element={<InstructorClass />}>
                <Route path="lesson/new" element={<LessonCreate/>} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route
                path="/classes/:classId/request"
                element={<ClassInvite />}
              />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
