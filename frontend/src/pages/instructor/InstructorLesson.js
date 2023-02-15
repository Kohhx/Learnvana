import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getClassLesson } from "../../features/instructor/instructorSlice"
import useThunk from '../../hooks/useThunkHook'

const InstructorLesson = () => {
  const ids = useParams();
  console.log("all retreived ids",ids)
  const { classLesson } = useSelector((state) => state.instructor);

  const [
    dogetClassLesson,
    getLessonLoading,
    getLessonSuccess,
    getLessonError,
  ] = useThunk(getClassLesson);

  useEffect(() => {
    dogetClassLesson(ids);
  }, [dogetClassLesson, ids]);


  return (
    <div>
      <p>{classLesson.title}</p>
      <p>sssssssss</p>
    </div>
  )
}

export default InstructorLesson
