import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// GENERAL IMPORT
import ProtectedRoute from "./routing/ProtectedRoute";
import Navbar from "./components/Navbars/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// INSTRUCTOR IMPORT
import InstructorClassLayout from "./components/Layouts/InstructorClassLayout";
import InstructorSignUp from "./pages/instructor/InstructorSignUp";
import InstructorCreateClass from "./pages/instructor/InstructorCreateClass";
import InstructorClassUpdate from "./pages/instructor/InstructorClassUpdate";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorLessons from "./pages/instructor/InstructorLessons";
import InstructorLesson from "./pages/instructor/InstructorLesson";
import InstructorClassInvite from "./pages/instructor/InstructorClassInvite";
import InstructorClassPendingStudents from "./pages/instructor/InstructorClassPendingStudents";
import InstructorClassStudents from "./pages/instructor/InstructorClassStudents";
import InstructorProfileUpdate from "./pages/instructor/InstructorProfileUpdate";
import InstructorDashboardClasses from "./pages/instructor/instructorDashboard/InstructorDashboardClasses";
import InstructorDashboardMain from "./pages/instructor/instructorDashboard/InstructorDashboardMain";
import InstructorDashboardSetting from "./pages/instructor/instructorDashboard/InstructorDashboardSetting";
import InstructorDashBoardSignup from "./pages/instructor/instructorDashboard/InstructorDashBoardSignup";
import InstructorDashboardLayout2 from "./components/Layouts/InstructorDashboard/InstructorDashboardLayout2";

// STUDENTS IMPORT
import StudentClassLayout from "./components/Layouts/StudentClassLayout";
import StudentSignUp from "./pages/student/StudentSignUp";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentLessons from "./pages/student/StudentLessons";
import StudentLesson from "./pages/student/StudentLesson";
import StudentClassmates from "./pages/student/StudentClassmates";

// GUARDIANS IMPORT
import GuardianCreateStudents from "./pages/guardian/GuardianCreateStudents";
import GuardianDashboard from "./pages/guardian/GuardianDashboard";

import DashboardLayout from "./components/Layouts//DashboardLayout/DashboardLayout";
import ProtectRouteProfileCheck from "./routing/ProtectRouteProfileCheck";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/editor" element={<EditorTest />} /> */}
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

            <Route path="/test" element={<DashboardLayout />} />

            {/**
             * =================================================================
             *  Private Routes for profile sign up
             * =================================================================
             */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/instructors/dashboard"
                element={<DashboardLayout />}
              >
                <Route path="signup" element={<InstructorDashBoardSignup />} />
              </Route>
            </Route>

            {/**
             * =================================================================
             *  Private Routes
             * =================================================================
             */}

            <Route element={<ProtectRouteProfileCheck />}>
              {/* Classes */}
              <Route path="/classes/:classId">
                <Route path="request" element={<InstructorClassInvite />} />
              </Route>
              {/* End */}

              {/* Instructor */}
              <Route path="/instructors">
                {/* <Route path="signup" element={<InstructorSignUp />} /> */}
                <Route path="update" element={<InstructorProfileUpdate />} />
                <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<InstructorDashboardMain />} />
                  <Route
                    path="setting"
                    element={<InstructorDashboardSetting />}
                  />

                  {/* Leon this is the new layout */}
                  <Route element={<InstructorDashboardLayout2 />}>
                    <Route path="classes" element={<InstructorDashboardClasses />} />
                  </Route>

                </Route>

                {/* Old route to be put into the new layout. Comment out for refereences */}
                {/* <Route path="classes/new" element={<InstructorCreateClass />} />
                <Route
                  path="classes/:classId"
                  element={<InstructorClassLayout />}
                >
                  <Route path="update" element={<InstructorClassUpdate />} />
                  <Route path="students">
                    <Route index element={<InstructorClassStudents />} />
                    <Route
                      path="pending"
                      element={<InstructorClassPendingStudents />}
                    />
                  </Route>
                  <Route path="lessons" element={<InstructorLessons />} />
                  <Route
                    path="lessons/:lessonId"
                    element={<InstructorLesson />}
                  />
                </Route> */}
              </Route>
              {/* End */}

              {/* Students */}
              <Route path="/students">
                <Route path="signup" element={<StudentSignUp />} />
                <Route path=":studentId">
                  <Route path="dashboard" element={<StudentDashboard />} />
                  <Route
                    path="classes/:classId"
                    element={<StudentClassLayout />}
                  >
                    <Route path="classmates" element={<StudentClassmates />} />
                    <Route path="lessons" element={<StudentLessons />} />
                    <Route
                      path="lessons/:lessonId"
                      element={<StudentLesson />}
                    />
                  </Route>
                </Route>
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
