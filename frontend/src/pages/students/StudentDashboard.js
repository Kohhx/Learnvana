import React, { useEffect } from "react";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { getStudentClasses, reset } from "../../features/student/studentSlice";
import Classitem from "../../components/Classitem"
import useThunk from "../../hooks/useThunkHook";


const StudentDashboard = () => {

  const { studentClasses } = useSelector((state) => state.student)

  const [
    doGetStudentClasses,
    getInstructorLoading,
    getInstructorSuccess,
    getInstructorError,
  ] = useThunk(getStudentClasses);


  useEffect(() => {
    doGetStudentClasses();
  }, [doGetStudentClasses]);

  const classesDisplay = studentClasses.map((singleClass,i) => <Classitem key={i} classData={singleClass}/> );



  return (
    <div>
      {classesDisplay}
    </div>
  )
}

export default StudentDashboard
