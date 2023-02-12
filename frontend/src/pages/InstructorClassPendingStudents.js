import React, { useDebugValue, useEffect } from "react";
import { useParams } from "react-router-dom";
import useThunk from "../hooks/useThunkHook";
import {
  getInstructorClassPendingStudents,
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

  useEffect(() => {
    doGetPendingStudents(classId);
    return () => {
      instructorDispatch(reset());
    };
  }, [doGetPendingStudents, classId, instructorDispatch]);

  // Accept Handler
  const acceptStudentHandler = (studentId) => {
    console.log("Accept Student: ",studentId);
  };

  // Reject Handler
  const rejectStudentHandler = (studentId) => {
    console.log("Reject Student: ",studentId);
  };

  const pendingStudentList = pendingStudents.map((student, index) => (
    <div className="w-4/6 mx-auto mt-4">
      <div className="flex flex-item items-center w-full">
        <div className="grow">
          <h1>
            {index + 1}
            {`)`} Student Name: {student.first_name} {student.last_name}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button primary onClick={() => acceptStudentHandler(student._id)}>
            Accept
          </Button>
          <Button danger onClick={() => rejectStudentHandler(student._id)}>
            Reject
          </Button>
        </div>
      </div>
    </div>
  ));

  return <>{pendingStudentList}</>;
};

export default InstructorClassPendingStudents;
