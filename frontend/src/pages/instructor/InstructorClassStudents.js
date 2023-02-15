import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useThunk from "../../hooks/useThunkHook";
import {
  reset,
  getStudentsFromClass,
  deleteStudentFromClass,
} from "../../features/instructor/instructorSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import SortableTable from "../../components/Shared/SortableTable";
import DotLoader from "react-spinners/DotLoader";

const InstructorClassStudents = () => {
  const instructorDispatch = useDispatch();
  const { classStudents } = useSelector((state) => state.instructor);
  const { classId } = useParams();

  const [
    doGetStudentsFromClass,
    getStudentsFromClassLoading,
    getStudentsFromClassSuccess,
    getStudentsFromClassError,
  ] = useThunk(getStudentsFromClass);

  const [
    doDeleteStudentFromClass,
    deleteStudentFromClassLoading,
    deleteStudentFromClassSuccess,
    deleteStudentFromClassError,
  ] = useThunk(deleteStudentFromClass);

  useEffect(() => {
    doGetStudentsFromClass(classId);
    return () => {
      instructorDispatch(reset());
    };
  }, [doGetStudentsFromClass, classId, instructorDispatch]);

  // Remove Student Handler
  const removeStudentHandler = (studentId) => {
    console.log("Reject Student: ", studentId);
    const dataIn = {
      classId,
      studentId,
    };
    doDeleteStudentFromClass(dataIn);
  };

  const tableConfig = [
    {
      label: "Index",
      render: (i) => i,
      index: true,
      // sortValue: (rowData) => rowData.first_name,
    },
    {
      label: "First Name",
      render: (rowData) => rowData.first_name,
      // sortValue: (rowData) => rowData.first_name,
    },
    {
      label: "Last Name",
      render: (rowData) => rowData.last_name,
      // sortValue: (rowData) => rowData.last_name,
      // render: (rowData) => <div className={`p-2 m-3 ${rowData.color}`}></div>,
    },
    {
      label: "Age",
      render: (rowData) => rowData.age,
      // sortValue: (rowData) => rowData.age,
      // header: () => <th className="bg-red-500">Score</th>,
    },
    {
      render: (rowData) => (
        <div className={`p-2 m-3`}>
          <Button
            danger
            rounded
            onClick={() => removeStudentHandler(rowData._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (getStudentsFromClassLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-4/6 mx-auto mt-4">
        <DotLoader
          size={120}
          color="#36d7b7"
          loading={getStudentsFromClassLoading}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (classStudents.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen w-4/6 mx-auto mt-4">
        <h1>No students enrolled in class</h1>
      </div>
    );
  }

  return (
    <div className="w-4/6 mx-auto mt-4">
      <h1 className="mb-5 text-center font-bold ">Class Student List</h1>
      <SortableTable index data={classStudents} config={tableConfig} />
    </div>
  );
};

export default InstructorClassStudents;
