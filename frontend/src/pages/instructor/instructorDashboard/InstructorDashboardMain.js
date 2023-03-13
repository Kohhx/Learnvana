import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import DashboardUpdateUserModal from "../../../components/Layouts/InstructorDashboard/DashboardUpdateUserModal";
import { useDispatch, useSelector } from "react-redux";
import "./InstructorDashboardMain.css"

const InstructorDashboardMain = () => {
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalIsOpen] = useState(false);

  let avatarImgSRC =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  if (user?.role === "instructor" && user.profiles?.avatar?.url) {
    avatarImgSRC = user.profiles.avatar?.url;
  }
  return (
    <>
      <DashboardUpdateUserModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalIsOpen(false)}
      />
      <div className="dashboard-main-grid min-h-screen">
        <div className="bg-proj-white3-200 dashboard-main-header flex items-center">
          <div className="w-[85%] mx-auto">
            <div>
              <div className="rounded-full max-w-[10rem] max-h-[10rem] border-4 border-proj-blue4-300 relative">
                <button
                  onClick={() => setIsModalIsOpen(true)}
                  className="p-1.5 rounded-full bg-proj-blue4-200  w-fit absolute bottom-[1.3rem] -right-1 flex items-center justify-center"
                >
                  <FaUserEdit className="text-white text-lg hover:opacity-70" />
                </button>
                <img
                  className="rounded-full w-full h-full object-cover"
                  src={avatarImgSRC}
                  alt="user avatar"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-main-leftbody bg-proj-white4-300"></div>
        <div className="dashboard-main-rightbody bg-proj-white3-200"></div>

      </div>
    </>
  );
};

export default InstructorDashboardMain;
