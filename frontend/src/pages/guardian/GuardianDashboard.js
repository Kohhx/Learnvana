import React, { useEffect } from "react";
import useThunk from "../../hooks/useThunkHook";
import { getGuardianStudents } from "../../features/guardian/guardianSlice";
import { addStudent } from "../../features/student/studentSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

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

  const handleStudentClassSelect = (student, classId) => {
    console.log(student);
    dispatch(addStudent(student));
    navigate(`/students/${student._id}/classes/${classId}`);
  };

  const handleStudentSelect = (student) => {
    dispatch(addStudent(student));
    navigate(`/students/${student._id}/dashboard`);
  };

  const studentClassContent = guardianStudents.map((student, i) => {
    const classes = student.classes.map((studentClasses) => {
      return (
        <Button
          onClick={() => handleStudentClassSelect(student, studentClasses._id)}
        >
          {studentClasses.title}
        </Button>
      );
    });

    return (
      <li className="mb-3">
        <Button
          classNames="inline-block"
          onClick={() => handleStudentSelect(student)}
        >
          {`Student ${i + 1}: `}
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
