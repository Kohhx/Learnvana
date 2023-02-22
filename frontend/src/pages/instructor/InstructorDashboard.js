import React, { useEffect } from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInstructorClasses, deleteInstructorClass } from "../../features/instructor/instructorSlice";
import Classitem from "../../components/Classitem"
import useThunk from "../../hooks/useThunkHook";
import SortableTable from "../../components/Shared/SortableTable";
import DotLoader from "react-spinners/DotLoader";

const InstructorDashboard = () => {
  const { instructorClasses } = useSelector((state) => state.instructor);
  const { user } = useSelector((state) => state.auth);
  const role = user.role

  const [
    doGetInstructorClasses,
    getInstructorLoading,
    getInstructorSuccess,
    getInstructorError,
  ] = useThunk(getInstructorClasses);

  const [
    doDeleteInstructorClass,
    deleteInstructorClassLoading,
    deleteInstructorClassSuccess,
    deleteInstructorClassError,
  ] = useThunk(deleteInstructorClass);

  useEffect(() => {
    doGetInstructorClasses();
  }, [doGetInstructorClasses]);

  // // const content = instructorClasses.map((singleClass,i) => <Classitem key={i} classData={singleClass} role={role}/> );
  // const { title, _id } = classData;

  // Remove Student Handler
  const removeClassHandler = (classId) => {
    const dataIn = {
      classId,
      action: "deleteClass",
    };
    doDeleteInstructorClass(dataIn);
  };

  const tableConfig = [
    {
      label: "Index",
      render: (i) => i,
      index: true,
      // sortValue: (rowData) => rowData.first_name,
    },
    {
      label: "Classes",
      render: (rowData) => <Link to={`/${role}s/classes/${rowData._id}`}>{rowData.title}</Link>
      // sortValue: (rowData) => rowData.first_name,
    },
    {
      render: (rowData) => (
        <div className={`p-2 m-3`}>
          <Button
            danger
            rounded
            onClick={() => removeClassHandler(rowData._id)}
          >
            Delete
          </Button>
        </div>
      ),
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
        <h1>No classes</h1>
      </div>
    );
  }

  return (
    <div className="w-4/6 mx-auto mt-4">
      <h1 className="mb-5 text-center font-bold ">All classes</h1>
      <SortableTable index data={instructorClasses} config={tableConfig} />
    </div>
  );
};

export default InstructorDashboard;
