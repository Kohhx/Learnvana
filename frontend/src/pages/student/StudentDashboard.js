import React, { useEffect } from "react";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import { getStudentClasses } from "../../features/student/studentSlice";
import Classitem from "../../components/Classitem";
import useThunk from "../../hooks/useThunkHook";

const StudentDashboard = () => {
  const { studentClasses, student } = useSelector((state) => state.student);
  const { user } = useSelector((state) => state.auth);
  const role = user.role;

  const [
    doGetStudentClasses,
    getStudentClassesLoading,
    getStudentClassesSuccess,
    getStudentClassesError,
  ] = useThunk(getStudentClasses);

  // console.log(student._id)
  useEffect(() => {
    // if (getStudentClassesSuccess) {
      doGetStudentClasses(student._id);
    // }
  }, []);

  const classesDisplay = studentClasses.map((singleClass, i) => (
    <Classitem key={i} classData={singleClass} role={role} />
  ));

  return (
    <div>
      <p>Classes</p>
      {classesDisplay}
    </div>
  );
};

export default StudentDashboard;
