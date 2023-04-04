import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import DashboardUpdateUserModal from "../../../components/Layouts/InstructorDashboard/DashboardUpdateUserModal";
import { useDispatch, useSelector } from "react-redux";
import "./InstructorDashboardMain.css";
import Button from "../../../components/Button";
import { IoMdNotificationsOutline } from "react-icons/io";
import CardV1 from "../../../components/Shared/CardV1";
import SortableTable from "../../../components/Shared/SortableTable";
import { compareAsc, format } from "date-fns";
import { AiFillPlusCircle } from "react-icons/ai";
import SelectV2 from "../../../components/SelectV2";

const InstructorDashboardMain = () => {
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalIsOpen] = useState(false);

  let avatarImgSRC =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  if (user?.role === "instructor" && user.profiles?.avatar?.url) {
    avatarImgSRC = user.profiles.avatar?.url;
  }

  const tableData = [
    {
      class: "SwimEx",
      person: "Mr Anderson",
      information: "Class cancelled due to convid",
      time: new Date().getTime(),
    },
    {
      class: "Dev Math",
      person: "Mr Koh",
      information: "Sick till 12/10/2032",
      time: new Date().getTime(),
    },
    {
      class: "Elementary Coding",
      person: "Mr Leon",
      information: "Parent meetup on 15 June",
      time: new Date().getTime(),
    },
    {
      class: "Elementary Coding",
      person: "Mr Leon",
      information: "Parent meetup on 15 June",
      time: new Date().getTime(),
    },
  ];

  const tableConfig = [
    {
      label: "Class",
      render: (rowData) => rowData.class,
    },
    {
      label: "Person",
      render: (rowData) => rowData.person,
    },
    {
      label: "Information",
      render: (rowData) => rowData.information,
    },
    {
      label: "Time",
      render: (rowData) => format(rowData.time, "HH:mm"),
    },
  ];
  return (
    <>
      <DashboardUpdateUserModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalIsOpen(false)}
      />
      <div className="dashboard-main-grid min-h-screen">
        <div className="bg-proj-white3-200 dashboard-main-header flex">
          <div className="w-[95%] mx-auto flex items-center gap-6">
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

            <div className="relative w-content self-end mb-5">
              <div>
                <div className="absolute left-12 -top-10 message-bubble text-proj-grey3-300 bg-white">
                  <p className="from-wizard">
                    You 're a wizard,{" "}
                    <span className="capitalize">
                      {user.profiles.first_name}!
                    </span>
                  </p>
                </div>
              </div>

              <div className="h-full py-3 px-8 rounded-2xl bg-gradient-to-r from-proj-blue5-300 to-proj-orange1-300">
                <h2 className="text-white text-2xl mb-1">
                  Welcome back,
                  <span className="capitalize">{user.profiles.first_name}</span>
                </h2>
                <h4 className="text-proj-grey3-300 font-normal text-lg">
                  You achieve <span className="font-bold">80</span>% of your
                  target this week. Keep up the good work!
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-main-leftbody bg-proj-white4-300">
          <div className="main-top-section py-4 px-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="capitalize text-proj-grey3-300 text-xl font-medium">
                Announcements
              </h3>
              <Button
                rounded
                className="py-1 px-5 bg-proj-blue4-200 flex gap-2 items-center text-base text-white hover:opacity-80"
              >
                <span className="tracking-wide">Ongoing Class: </span>
                <span className="">3</span>
              </Button>
            </div>

            <div className="flex items-center justify-between gap-5">
              <div className="w-[70%] border-2">
                <CardV1 className="mb-3">
                  <SortableTable data={tableData} config={tableConfig} index />
                </CardV1>

                <CardV1 className="bg-proj-red1-300 text-center py-3 border-none">
                  <h5 className="text-white text-[18px]">
                    Absent announcements
                  </h5>
                </CardV1>
              </div>

              <div className="border-2 self-stretch">
                <CardV1 className="h-[100%]">
                  <h6 className="text-center font-semibold">Add Notes</h6>
                  <div className="flex items-center gap-4 pb-3">
                    <input
                      type="text"
                      className="outline-none bg-transparent border-b-2 px-1"
                    />
                    <div className="cursor-pointer">
                      <AiFillPlusCircle className="text-xl hover:opacity-50" />
                    </div>
                  </div>
                </CardV1>
              </div>
            </div>
          </div>

          <div className="main-bottom-section">
            <div className="flex px-8">
              <div className="w-[50%] px-4">
                <h3 className="capitalize text-proj-grey3-300 text-xl font-medium mb-2">
                  Today Classes
                </h3>
                <CardV1 className="px-3 py-5">
                  <div className="flex flex-col gap-3 h-[185px] overflow-auto px-3">
                    <CardV1 className="flex items-center justify-between text-sm bg-proj-blue4-200 text-proj-white3-200 border-none">
                      <p>Dev Math</p>
                      <p>03 - basic trigonometry</p>
                      <p>0900</p>
                    </CardV1>
                    <CardV1 className="flex items-center justify-between text-sm bg-proj-grey4-300 text-proj-grey3-400 border-none">
                      <p>Elementary Mathematics</p>
                      <p>03 - basic trigonometry</p>
                      <p>0900</p>
                    </CardV1>
                    <CardV1 className="flex items-center justify-between text-sm bg-proj-grey4-300 text-proj-grey3-400 border-none">
                      <p>Dev Math</p>
                      <p>03 - basic trigonometry</p>
                      <p>0900</p>
                    </CardV1>
                  </div>
                </CardV1>
              </div>

              <div className="w-[50%]">
                <div className="px-4">
                  <h3 className="capitalize text-proj-grey3-300 text-xl font-medium mb-2">
                    Achiever's Test
                  </h3>
                  <SelectV2
                    id="gender"
                    // label="Gender"
                    options={[
                      {
                        display: "Some",
                        value: "some",
                      },
                      {
                        display: "Latest",
                        value: "latest",
                      },
                    ]}
                    className="border border-proj-grey2-200 rounded-full px-2.5 py-1 text-sm"
                    optionTitle="All"
                    // value={formState.inputs.gender.value}
                    // isFocus={formState.inputs.gender.isFocus}
                    // isValid={formState.inputs.gender.isValid}
                    // errorMessages={formState.inputs.gender.messages}
                  />
                  <div className="overflow-auto w-full h-[185px] flex flex-col gap-2 pr-1">
                    <CardV1 className="flex flex-col gap-1 items-center text-sm bg-proj-white3-200 text-proj-grey3-400">
                      <div className="w-full flex justify-between">
                        <p className="text-proj-blue4-200 font-bold">Dev Math</p>
                        <p>23 March 2023</p>
                      </div>
                      <div className="w-full flex justify-between">
                        <p>Completion Test</p>
                        <p>Not Graded</p>
                      </div>
                    </CardV1>
                    <CardV1 className="flex flex-col gap-1 items-center text-sm bg-proj-grey4-300 text-proj-grey3-400 border-none">
                      <div className="w-full flex justify-between">
                        <p className="text-proj-blue4-200 font-bold">Dev Math</p>
                        <p>3 April 2023</p>
                      </div>
                      <div className="w-full flex justify-between">
                        <p>Test 1: Trigometry</p>
                        <p>All Graded</p>
                      </div>
                    </CardV1>
                    <CardV1 className="flex flex-col gap-1 items-center text-sm bg-proj-grey4-300 text-proj-grey3-400 border-none">
                      <div className="w-full flex justify-between">
                        <p className="text-proj-blue4-200 font-bold">Dev Math</p>
                        <p>10 March 2023</p>
                      </div>
                      <div className="w-full flex justify-between">
                        <p>Swimming Gold Test</p>
                        <p>All Graded</p>
                      </div>
                    </CardV1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-main-rightbody bg-proj-white3-200"></div>
      </div>
    </>
  );
};

export default InstructorDashboardMain;
