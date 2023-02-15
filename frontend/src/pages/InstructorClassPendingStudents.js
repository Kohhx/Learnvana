import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useThunk from "../hooks/useThunkHook";
import {
  getInstructorClassPendingStudents,
  approveStudentToClass,
  rejectStudentToClass,
  reset,
} from "../features/instructor/instructorSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "../components/Button";

const InstructorClassPendingStudents = () => {
  const instructorDispatch = useDispatch();
  const { pendingStudents } = useSelector((state) => state.instructor);
  const { classId } = useParams();

  const [
    doGetPendingStudents,
    GetPendingStudentsLoading,
    GetPendingStudentsSuccess,
    GetPendingStudentsError,
  ] = useThunk(getInstructorClassPendingStudents);

  const [
    doApproveStudentToClass,
    approveStudentToClassLoading,
    approveStudentToClassSuccess,
    approveStudentToClassError,
  ] = useThunk(approveStudentToClass);

  const [
    doRejectStudentToClass,
    rejectStudentToClassLoading,
    rejectStudentToClassSuccess,
    rejectStudentToClassError,
  ] = useThunk(rejectStudentToClass);

  useEffect(() => {
    doGetPendingStudents(classId);
    return () => {
      instructorDispatch(reset());
    };
  }, [doGetPendingStudents, classId, instructorDispatch]);

  // Accept Handler
  const approveStudentHandler = (studentId) => {
    console.log("Accept Student: ", studentId);
    const dataIn = {
      classId,
      studentId,
    };
    doApproveStudentToClass(dataIn);
  };

  // Reject Handler
  const rejectStudentHandler = (studentId) => {
    console.log("Reject Student: ", studentId);
    const dataIn = {
      classId,
      studentId,
    };
    doRejectStudentToClass(dataIn);
  };

  const pendingStudentList = pendingStudents.map((student, index) => (
    <div className="flex flex-item items-center w-full mb-3" key={index}>
      <div className="grow">
        <h1>
          {index + 1}
          {`)`} Student Name: {student.first_name} {student.last_name}
        </h1>
      </div>
      <div className="flex gap-2">
        <Button
          primary
          onClick={() => approveStudentHandler(student._id, "accept")}
        >
          Accept
        </Button>
        <Button
          danger
          onClick={() => rejectStudentHandler(student._id, "reject")}
        >
          Reject
        </Button>
      </div>
    </div>
  ));

  return (
    <div className="w-4/6 mx-auto mt-4">
      <h1 className="mb-5 text-center font-bold ">Pending Students</h1>
      {pendingStudentList}
    </div>
  );
};

export default InstructorClassPendingStudents;
