import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, getInstructorClass } from "../features/class/classSlice";
import Hamburger from "../components/Shared/Hamburger";
import { CSSTransition } from "react-transition-group";
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
        <CSSTransition
          in={isOpen}
          timeout={200}
          classNames="fade"
          unmountOnExit
        >
          <div className="h-screen w-[13%] bg-orange-400"></div>
        </CSSTransition>
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
