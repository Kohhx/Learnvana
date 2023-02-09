import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, getInstructorClass } from "../features/class/classSlice";
import Hamburger from "../components/Shared/Hamburger";
import "../components/Shared/Hamburger.css";

const InstructorClass = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      <div className="flex">
        {isOpen && <div className="h-screen w-[13%] bg-orange-400"></div>}
        <div>
          <Hamburger
            classNames="m-2"
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
          {oneClass.title}
        </div>
      </div>
    </div>
  );
};

export default InstructorClass;
