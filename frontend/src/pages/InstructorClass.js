
import React, { useEffect, useState } from 'react'
import { useParams, NavLink, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { reset, getInstructorClass } from "../features/instructor/instructorSlice"
import Button from "../components/Button";
import useThunk from '../hooks/useThunkHook';
import Hamburger from "../components/Shared/Hamburger";
import { CSSTransition } from "react-transition-group";
import ClassSidebar from "../components/Shared/ClassSidebar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LessonCreate from "./LessonCreate";

const InstructorClass = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  // Side Bar config
  const sideBarConfig = [
    { name: "Invite Link", link: `/instructors/classes/${classId}/request` },
    { name: "Create Lessons", link: `/instructors/classes/${classId}/lessons` },
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
          {instructorClass.title}
          <Button primary rounded><NavLink to={`/instructors/classes/${classId}/lessons`}>Create Lesson</NavLink></Button>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default InstructorClass;
