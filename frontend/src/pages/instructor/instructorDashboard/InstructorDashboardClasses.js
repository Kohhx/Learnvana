import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInstructorClasses, deleteInstructorClass } from "../../../features/instructor/instructorSlice";
import Classdisplay from "../../../components/Classdisplay"
import useThunk from "../../../hooks/useThunkHook";
import SortableTable from "../../../components/Shared/SortableTable";
import DotLoader from "react-spinners/DotLoader";
import DashboardCreateClassModal from "../../../components/Layouts/InstructorDashboard/DashboardCreateClassModal";

const InstructorDashboardClasses = () => {
  const { instructorClasses } = useSelector((state) => state.instructor);
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalIsOpen] = useState(false);
  const role = user.role

  const [
    doGetInstructorClasses,
    getInstructorLoading,
    getInstructorSuccess,
    getInstructorError,
  ] = useThunk(getInstructorClasses);

  useEffect(() => {
    doGetInstructorClasses();
  }, [doGetInstructorClasses]);


  // display all lessons
  const allClasses = instructorClasses.map((singleClass, i) => (
    <Classdisplay key={i} classData={singleClass} role="instructor" />
  ));


  const tableConfig = [
    {
      label: "Index",
      render: (i) => i,
      index: true,
      // sortValue: (rowData) => rowData.first_name,
    },
    {
      label: "Instructor",
      render: (rowData) => rowData.instructor_name
      // class create should allow of instructor name
    },
    {
      label: "Classes",
      render: (rowData) => <Link to={`/${role}s/classes/${rowData._id}`}>{rowData.title}</Link>
    },
    {
      label: "Start Date",
      render: (rowData) => ""
      // class create should allow of instructor name
    },
    {
      label: "End Date",
      render: (rowData) => ""
      // class create should allow of instructor name
    },
  ];

  if (getInstructorLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-4/6 mx-auto mt-4">
        <DotLoader
          size={120}
          color="#36d7b7"
          loading={getInstructorLoading}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (instructorClasses.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen w-4/6 mx-auto mt-4">
        <h1 className="capitalize text-proj-grey3-300 text-xl font-medium">active classes</h1>
        <h1>No classes</h1>
      </div>
    );
  }

  return (
    <>
      <DashboardCreateClassModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalIsOpen(false)}
      />
      <div className="py-4 px-8 h-screen overflow-auto scrollbar-hide">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-proj-grey3-300 text-xl font-medium">
              Active classes
            </h3>
          </div>
          <div className="flex items-center justify-between gap-2.5">
          <button
              onClick={() => setIsModalIsOpen(true)}
              className="py-1.5 px-3 rounded-full border-2 border-proj-grey3-300 hover:opacity-50 w-fit -right-1 flex items-center justify-center"
            >
              <p className="capitalize text-proj-grey3-300 font-medium">add class</p>
            </button>
            <button
              className="py-1.5 px-3 rounded-full border-2 border-proj-grey3-300 hover:opacity-50 w-fit -right-1 flex items-center justify-center"
            >
              <p className="capitalize text-proj-grey3-300 font-medium">view class history</p>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-16">

          {/* insertion of headers */ }
          <div className="col-span-4 pl-5">Class</div>
          <div className="col-span-3">Instructor</div>
          <div className="col-span-3">Start Date</div>
          <div className="col-span-3">End Date</div>
          <div className="col-span-1"></div>
          <div className="col-span-1"></div>
          <div className="col-span-1 text-center">L/M</div>

          {/* insertion of rows data */ }
          {allClasses}

        </div>
      </div>
    </>
  );
}

export default InstructorDashboardClasses
