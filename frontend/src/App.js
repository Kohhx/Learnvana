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
import ClassInvite from "./pages/ClassInvite";
import InstructorClass from "./pages/InstructorClass";
import InstructorLesson from "./pages/InstructorLesson";
import InstructorClassPendingStudents from "./pages/InstructorClassPendingStudents";
import ClassLayout from "./components/Layouts/ClassLayout";
import InstructorClassStudents from "./pages/InstructorClassStudents";
import UpdateUser from "./pages/UpdateUser";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            {/**
             * =================================================================
             *  Public Routes
             * =================================================================
             */}
            {/* User Login */}
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
            <Route path="/users/update" element={<UpdateUser />} />
              <Route
                path="/users/signup/instructor"
                element={<InstructorSignUp />}
              />
              <Route path="/users/signup/student" element={<StudentSignUp />} />
            </Route>

            {/**
             * =================================================================
             *  Private Routes
             * =================================================================
             */}
            <Route element={<ProtectedRoute />}>
              {/* Classes */}
              <Route path="/classes/:classId">
                <Route path="request" element={<ClassInvite />} />
              </Route>
              {/* End */}

              {/* Instructor */}
              <Route path="/instructors">
                <Route path="dashboard" element={<InstructorDashboard />} />
                <Route path="classes/new" element={<NewClass />} />

                <Route path="classes/:classId" element={<ClassLayout />}>
                  <Route path="students">
                    <Route index element={<InstructorClassStudents />} />
                    <Route
                    path="pending"
                    element={<InstructorClassPendingStudents />}
                  />
                  </Route>
                  <Route path="lessons" element={<Lessons />} />
                  <Route path="lessons/:lessonId" element={<InstructorLesson />} />
                </Route>
              </Route>
              {/* End */}
            </Route>

            {/**
             * =================================================================
             *  404 Cannot be found page
             * =================================================================
             */}
            {/* 404 Page */}
            <Route path="*" element={<div>404 page not found</div>} />
            {/* End */}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
