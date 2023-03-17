import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import DashboardUpdateUserModal from "../../../components/Layouts/InstructorDashboard/DashboardUpdateUserModal";
import { useDispatch, useSelector } from "react-redux";
import "./InstructorDashboardMain.css";
import Button from "../../../components/Button";
import { IoMdNotificationsOutline } from "react-icons/io";

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
        <div className="bg-proj-white3-200 dashboard-main-header flex ">
          <div className="w-[95%] mx-auto flex items-center gap-6 py-8">
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

            <div className="flex flex-col gap-1 font-inter mr-6">
              <h2 className="capitalize text-proj-grey3-300 text-2xl">
                {user.profiles.first_name} {user.profiles.last_name}
              </h2>
              <h4 className="capitalize font-normal text-proj-grey3-300 text-base">
                {user.role}
              </h4>
              <Button
                rounded
                className="px-5 mt-4 bg-proj-blue4-200 flex gap-2 items-center text-base text-white hover:opacity-80"
              >
                <IoMdNotificationsOutline className="text-xl" />
                <span className="tracking-wide">Notification</span>
                <span className="">3</span>
              </Button>
            </div>

            <div className="w-[22em] flex flex-col gap-[0.15rem] font-inter text-proj-grey3-300 mr-5">
              <div className="flex items-center justify-between">
                <p>Skills cert Acquired</p>
                <p className="font-semibold">15</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Proficiency Skill</p>
                <p className="font-semibold">9</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Awarded Excellence</p>
                <p className="font-semibold">3</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Best Skill</p>
                <p className="font-semibold">Roller Blading</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Most time spent</p>
                <p className="font-semibold">Math</p>
              </div>
            </div>

            <div className="relative w-content">
              <div>
                <div className="absolute left-12 -top-10 message-bubble text-proj-grey3-300 bg-white">
                  <p className="from-wizard">
                    You 're a wizard, <span className="capitalize">{user.profiles.first_name}!</span>
                  </p>
                </div>
              </div>

              <div className="h-full py-3 px-8 rounded-2xl bg-gradient-to-r from-proj-blue5-300 to-proj-orange1-300">
                <h2 className="text-white text-2xl mb-1">
                  Welcome back,<span className="capitalize"> {user.profiles.first_name}</span>
                </h2>
                <h4 className="text-proj-grey3-300 font-normal text-lg">
                  You achieve <span className="font-bold">80</span>% of your
                  target this week. Keep up the good work!
                </h4>
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
