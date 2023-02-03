import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { reset, getInstructorClass } from "../features/class/classSlice"

const InstructorClass = () => {
  let { classId } = useParams();
  const classDispatch = useDispatch();
  const { oneClass, isSuccess, isLoading } = useSelector((state) => state.class);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        classDispatch(reset());
      }
    };
  }, [isSuccess,classDispatch]);

  useEffect(() => {
    classDispatch(getInstructorClass(classId));
  }, [classDispatch]);


  return (
    <div>{oneClass.title}</div>
  )
}

export default InstructorClass
