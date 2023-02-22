import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useThunk from "../../hooks/useThunkHook";
import { getStudentsFromClass } from "../../features/student/studentSlice";
import { useSelector } from "react-redux";

const StudentClassmates = () => {
  const { classStudents } = useSelector((state) => state.student)
  const { classId } = useParams();

  const [
    doGetStudentsFromClass,
    getStudentsFromClassLoading,
    getStudentsFromClassSuccess,
    getStudentsFromClassError,
  ] = useThunk(getStudentsFromClass);


  useEffect(() => {
    doGetStudentsFromClass(classId);
  }, [doGetStudentsFromClass]);

  const classMates = classStudents.map((student, i) => <li key={i}> {student.first_name} </li> );



  return (
    <div>
      <p>Students</p>
      {classMates}
    </div>
  )
}

export default StudentClassmates
