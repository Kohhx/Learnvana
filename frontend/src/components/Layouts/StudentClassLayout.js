import React, { useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import Hamburger from "../Shared/Hamburger";
import { CSSTransition } from "react-transition-group";
import ClassSidebar from "../Shared/ClassSidebar";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const ClassLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  let { classId, studentId } = useParams();
  // Side Bar config
  const sideBarConfig = [
    { name: "Lessons", link: `/students/${studentId}/classes/${classId}/lessons` },
    {
      name: "Classmates",
      link: `/students/${studentId}/classes/${classId}/classmates`,
    },
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
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ClassLayout;
