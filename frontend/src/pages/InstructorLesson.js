import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { reset, getInstructorLesson } from "../features/lesson/lessonSlice"

const InstructorLesson = () => {
  let { lessonId } = useParams();
  const lessonDispatch = useDispatch();
  const { oneLesson, isSuccess, isLoading } = useSelector((state) => state.lesson);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        lessonDispatch(reset());
      }
    };
  }, [isSuccess,lessonDispatch]);

  useEffect(() => {
    lessonDispatch(getInstructorLesson(lessonId));
  }, [lessonDispatch]);


  return (
    <div>{oneLesson.title}</div>
  )
}

export default InstructorLesson
