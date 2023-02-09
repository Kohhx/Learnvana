import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, getInstructorClass } from "../features/class/classSlice";
import Hamburger from "../components/Shared/Hamburger";
import "../components/Shared/Hamburger.css"

const InstructorClass = () => {
  let { classId } = useParams();
  const classDispatch = useDispatch();
  const { oneClass, isSuccess, isLoading } = useSelector(
    (state) => state.class
  );

  useEffect(() => {
    return () => {
      if (isSuccess) {
        classDispatch(reset());
      }
    };
  }, [isSuccess, classDispatch]);

  useEffect(() => {
    classDispatch(getInstructorClass(classId));
  }, [classDispatch]);

  return (
    <div>
      <div className="bg-orange-300 h-12 w-screen p-2">
      <Hamburger />
      </div>
      <div>{oneClass.title}</div>
    </div>
  );
};

export default InstructorClass;
