import React, { useEffect } from 'react'
import { useParams, NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { reset, getInstructorClass } from "../features/class/classSlice"
import Button from "../components/Button";

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
    <div>
      <div>{oneClass.title}</div>
      <Button primary rounded><NavLink to={`/classes/${classId}/lessons/new`}>Create Lesson</NavLink></Button>
      </div>
  )
}

export default InstructorClass
