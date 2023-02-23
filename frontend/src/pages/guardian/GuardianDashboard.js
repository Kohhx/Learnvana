import React, { useEffect } from "react";
import useThunk from "../../hooks/useThunkHook";
import { getGuardianStudents } from "../../features/guardian/guardianSlice";
import { addStudent } from "../../features/student/studentSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom"

const GuardianDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleStudentSelect = (student) => {
    console.log(student);
    dispatch(addStudent(student));
    navigate("/students/dashboard")
  };

  const studentClassContent = guardianStudents.map((student, i) => {
    const classes = student.classes.map((studentClasses) => {
      return (
        <Link
          className="ml-2 block"
          to={`/students/classes/${studentClasses._id}`}
        >
          {studentClasses.title}
        </Link>
      );
    });

    return (
      <li className="mb-3">
        {`Student ${i + 1}: `}
        <Button onClick={() => handleStudentSelect(student)}>
          {student.first_name}
        </Button>

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
