import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInstructorClasses, deleteInstructorClass } from "../../../features/instructor/instructorSlice";
import Classitem from "../../../components/Classitem"
import useThunk from "../../../hooks/useThunkHook";
import SortableTable from "../../../components/Shared/SortableTable";
import DotLoader from "react-spinners/DotLoader";
import DashboardCreateClassModal from "../../../components/Layouts/InstructorDashboard/DashboardCreateClassModal";
import { FaUserEdit } from "react-icons/fa";

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


  const tableConfig = [
    {
      label: "Index",
      render: (i) => i,
      index: true,
      // sortValue: (rowData) => rowData.first_name,
    },
    {
      label: "Instructor",
      render: (rowData) => rowData.instructor
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
      <div className="w-5/6 mx-auto mt-4">
        <button
          onClick={() => setIsModalIsOpen(true)}
          className="p-1.5 rounded-full border-2 border-proj-grey3-300  w-fit -right-1 flex items-center justify-center"
        >
          <p className="capitalize text-proj-grey3-300 font-medium">add class</p>
        </button>

        <div className="w-4/6 mx-auto mt-4">
          <h1 className="capitalize text-proj-grey3-300 text-xl font-medium">active classes</h1>
          <div className="mt-3">
            {<SortableTable index data={instructorClasses} config={tableConfig} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default InstructorDashboardClasses
