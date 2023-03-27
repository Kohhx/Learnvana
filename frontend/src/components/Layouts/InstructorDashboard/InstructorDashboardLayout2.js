import React from "react";
import { Outlet } from "react-router-dom";
import "./InstructorDashboardLayout2.css";

const InstructorDashboardLayout2 = () => {
  return (
    <div className="dashBoard-layout2-grid min-h-full">
      <div className="dashBoard-layout2-header bg-proj-white3-200"></div>
      <div className="dashBoard-layout2-left-main bg-proj-white4-300">
        <Outlet />
      </div>
      <div className="dashBoard-layout2-right-main bg-proj-white3-200"></div>
    </div>
  );
};

export default InstructorDashboardLayout2;
