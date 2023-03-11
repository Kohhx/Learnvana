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
import { logout, reset } from "../../features/auth/authSlice";
import DashboardSidebar from "../Shared/DashboardSidebar";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Modal from "../Shared/Modal";

const DashboardLayout = () => {
  const [isModalOpen, setIsModalIsOpen] = useState(false);
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
  ];

  let avatarImgSRC =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  if (user?.role === "instructor" && user.profiles?.avatar?.url) {
    avatarImgSRC = user.profiles?.avatar.url;
  }

  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalIsOpen(false)}>
        <h1>Are you sure you want to join class?</h1>
      </Modal>
      <div className="dashboard-grid h-screen bg-proj-blue4-300">
        <div className="bg-proj-white3-200 dashboard-header flex items-center">
          <div className="w-[85%] mx-auto">
            <div>
              <div className="rounded-full max-w-[10rem] max-h-[10rem] border-2 border-black relative">
                <button
                  onClick={() => setIsModalIsOpen(true)}
                  className="p-0 rounded-full bg-white w-fit absolute bottom-[1.3rem] right-0 "
                >
                  <BsFillPlusCircleFill className="text-proj-blue4-200 text-3xl " />
                </button>
                <img
                  className="rounded-full max-w-full max-h-full object-cover"
                  src={avatarImgSRC}
                  alt="user avatar"
                />
              </div>
            </div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="bg-proj-white3-200 dashboard-sidebar p-8 border-2 border-green-400 overflow-y-auto">
          <DashboardSidebar sideBarConfig={sideBarConfig} />
        </div>
        <div className="bg-proj-white4-200 dashboard-main">
          <Outlet />
        </div>
        <div className="bg-proj-white3-200 dashboard-main-right"></div>
      </div>
    </>
  );
};

export default DashboardLayout;
