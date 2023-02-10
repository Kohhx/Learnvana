import React, { useEffect } from 'react'
import { useParams, NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { reset, getInstructorClass } from "../features/instructor/instructorSlice"
import Button from "../components/Button";
import useThunk from '../hooks/useThunkHook';

const InstructorClass = () => {
  let { classId } = useParams();
  const { instructorClass } = useSelector((state) => state.instructor);

  const [
    doGetInstructorClasses,
    getInstructorLoading,
    getInstructorSuccess,
    getInstructorError,
  ] = useThunk(getInstructorClass);

  // useEffect(() => {
  //   return () => {
  //     if (isSuccess) {
  //       classDispatch(reset());
  //     }
  //   };
  // }, [isSuccess,classDispatch]);

  useEffect(() => {
    doGetInstructorClasses(classId);
  }, [doGetInstructorClasses, classId]);


  return (
    <div>
      <div>{instructorClass.title}</div>
      <Button primary rounded><NavLink to={`/instructors/classes/${classId}/lessons`}>Create Lesson</NavLink></Button>
      </div>
  )
}

export default InstructorClass
