import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// GENERAL IMPORT
import ProtectedRoute from "./routing/ProtectedRoute";
import ClassLayout from "./components/Layouts/ClassLayout";
import Navbar from "./components/Navbars/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// INSTRUCTOR IMPORT
import InstructorSignUp from "./pages/instructor/InstructorSignUp";
import InstructorCreateClass from "./pages/instructor/InstructorCreateClass";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorLessons from "./pages/instructor/InstructorLessons";
import InstructorLesson from "./pages/instructor/InstructorLesson";
import InstructorClassInvite from "./pages/instructor/InstructorClassInvite";
import InstructorClassPendingStudents from "./pages/instructor/InstructorClassPendingStudents";
import InstructorClassStudents from "./pages/instructor/InstructorClassStudents";
import InstructorProfileUpdate from "./pages/instructor/InstructorProfileUpdate";

// STUDENTS IMPORT
import StudentSignUp from "./pages/students/StudentSignUp";
import StudentDashboard from "./pages/students/StudentDashboard";

// GUARDIANS IMPORT
import GuardianCreateStudents from "./pages/guardian/GuardianCreateStudents"
import GuardianDashboard from "./pages/guardian/GuardianDashboard";

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
                <Route path="request" element={<InstructorClassInvite />} />
              </Route>
              {/* End */}

              {/* Instructor */}
              <Route path="/instructors">
                <Route path="signup" element={<InstructorSignUp />} />
                <Route
                  path="update"
                  element={<InstructorProfileUpdate />}
                />
                <Route path="dashboard" element={<InstructorDashboard />} />
                <Route path="classes/new" element={<InstructorCreateClass />} />

                <Route path="classes/:classId" element={<ClassLayout />}>
                  <Route path="students">
                    <Route index element={<InstructorClassStudents />} />
                    <Route
                      path="pending"
                      element={<InstructorClassPendingStudents />}
                    />
                  </Route>
                  <Route path="lessons" element={<InstructorLessons />} />
                  <Route path="lessons/:lessonId" element={<InstructorLesson />} />
                </Route>
              </Route>
              {/* End */}

              {/* Students */}
              <Route path="/students">
                <Route path="signup" element={<StudentSignUp />} />
                <Route path="dashboard" element={<StudentDashboard />} />
              </Route>
              {/* End */}

              {/* Guardians */}
              <Route path="/guardians">
                <Route path="signup" element={<GuardianCreateStudents />} />
                <Route path="dashboard" element={<GuardianDashboard />} />
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
