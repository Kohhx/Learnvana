import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, getInstructorClass } from "../features/class/classSlice";
import Hamburger from "../components/Shared/Hamburger";
import { CSSTransition } from "react-transition-group";
import ClassSidebar from "../components/Shared/ClassSidebar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LessonCreate from "./LessonCreate";

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

  // Side Bar config
  const sideBarConfig = [
    { name: "Invite Link", link: `/classes/${classId}/request` },
    { name: "Create Lessons", link: `/classes/${classId}/lesson/new` },
  ];

  return (
    <div>
      <div className="flex">
        <CSSTransition
          in={isOpen}
          timeout={200}
          classNames="fade" // Classes for css transition in index.css
          unmountOnExit
        >
          <ClassSidebar sideBarConfig={sideBarConfig} />
        </CSSTransition>
        <div>
          <Hamburger
            classNames="m-2"
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default InstructorClass;
