import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStudentClasses } from "../../features/student/studentSlice";
import Classitem from "../../components/Classitem";
import useThunk from "../../hooks/useThunkHook";

const StudentDashboard = () => {
  const { studentClasses } = useSelector((state) => state.student);
  const { user } = useSelector((state) => state.auth);
  const role = user.role;
  const { studentId } = useParams();

  const [
    doGetStudentClasses,
    getStudentClassesLoading,
    getStudentClassesSuccess,
    getStudentClassesError,
  ] = useThunk(getStudentClasses);

  // console.log(student._id)
  // let studentId = student?._id ? student._id : user.profiles._id;
  // console.log(studentId)
  useEffect(() => {
    doGetStudentClasses(studentId);
  }, []);

  let classesDisplay;
  if (studentClasses) {
    classesDisplay = studentClasses.map((singleClass, i) => (
      <Classitem key={i} classData={singleClass} role={role} />
    ));
  }

  if (getStudentClassesLoading) {
    <h1>loading...</h1>;
  }

  return (
    <div>
      <p>Classes</p>
      {classesDisplay}
    </div>
  );
};

export default StudentDashboard;
