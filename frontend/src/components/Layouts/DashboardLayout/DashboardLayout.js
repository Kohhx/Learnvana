import React, { useState } from "react";
import "./DashboardLayout.css";
import { MdSpaceDashboard } from "react-icons/md";
import { MdClass } from "react-icons/md";
import { HiDocumentCheck } from "react-icons/hi2";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../../features/auth/authSlice";
import DashboardSidebar from "./DashboardSidebar";
import { AiFillSetting } from "react-icons/ai";
import Modal from "../../Shared/Modal";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
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
    {
      icon: <AiFillSetting className="text-proj-blue4-300 text-4xl" />,
      name: "Setting",
      link: "/instructors/dashboard/setting",
      end: true,
    },
  ];

  return (
    <>
      <div className="dashboard-grid min-h-screen bg-proj-blue4-300">
        <div className="bg-proj-white3-200 dashboard-sidebar py-8 px-5 h-full">
          <DashboardSidebar sideBarConfig={sideBarConfig} />
        </div>
        <div className="bg-proj-blue4-300 dashboard-main">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
