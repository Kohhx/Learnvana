import React from "react";
import "./DashboardLayout.css";
import LearnvanaLogo from "../../images/LearnvanaLogo.png";
import { MdSpaceDashboard } from "react-icons/md";
import { MdClass } from "react-icons/md";
import { HiDocumentCheck } from "react-icons/hi2";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import DashboardSidebar from "../Shared/DashboardSidebar";

const DashboardLayout = () => {
  const authDispatch = useDispatch();
  const navigate = useNavigate();

  const sideBarConfig = [
    {
      icon: <MdSpaceDashboard className="text-proj-blue4-300 text-4xl" />,
      name: "Dashboard",
      link: "/instructors/dashboard",
    },
    {
      icon: <MdClass className="text-proj-blue4-300 text-4xl" />,
      name: "All Classes",
      link: "/instructors/dashboard",
    },
    {
      icon: <HiDocumentCheck className="text-proj-blue4-300 text-4xl" />,
      name: "Job Qualify",
      link: "/instructors/dashboard",
    },
    {
      icon: <BsFillChatLeftDotsFill className="text-proj-blue4-300 text-4xl" />,
      name: "Chat",
      link: "/instructors/dashboard",
    },
    {
      icon: <FaUserFriends className="text-proj-blue4-300 text-4xl" />,
      name: "Manage",
      link: "/instructors/dashboard",
    },
    {
      icon: <IoLogOut className="text-proj-blue4-300 text-4xl" />,
      name: "Logout",
      link: "/instructors/dashboard",
      button: true,
      handleClick: () => {
        authDispatch(logout());
        authDispatch(reset());
        navigate("/");
      },
    },
  ];

  return (
    <div className="dashboard-grid h-screen bg-proj-blue4-300">
      <div className="bg-proj-white3-200 dashboard-header"></div>
      <div className="bg-proj-white3-200 dashboard-sidebar p-8 border-2 border-green-400 overflow-y-auto">
        <DashboardSidebar sideBarConfig={sideBarConfig} />
      </div>
      <div className="bg-proj-white4-200 dashboard-main">
        <Outlet />
      </div>
      <div className="bg-proj-white3-200 dashboard-main-right"></div>
    </div>
  );
};

export default DashboardLayout;
