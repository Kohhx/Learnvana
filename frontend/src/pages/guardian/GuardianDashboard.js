import React, { useEffect } from "react";
import useThunk from "../../hooks/useThunkHook";
import { getGuardianStudents } from "../../features/guardian/guardianSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const GuardianDashboard = () => {
  const { guardianStudents } = useSelector((state) => state.guardian);
  const [
    doGetGuardianStudents,
    getGuardianStudentsLoading,
    getGuardianStudentsSuccess,
    getGuardianStudentsError,
  ] = useThunk(getGuardianStudents);

  useEffect(() => {
    doGetGuardianStudents();
  }, [doGetGuardianStudents]);

  const studentClassContent = guardianStudents.map((student,i) => {
    const classes = student.classes.map((studentClasses) => {
      return (
        <Link
          className="ml-2 block"
          to={`/students/${student._id}/classes/${studentClasses._id}`}
        >
          {studentClasses.title}
        </Link>
      );
    });

    return (
      <li className="mb-3">
        {`Student ${i+1}: `}{student.first_name}
        {classes}
      </li>
    );
  });

  return (
    <div>
      <ul>{studentClassContent}</ul>
    </div>
  );
};

export default GuardianDashboard;
