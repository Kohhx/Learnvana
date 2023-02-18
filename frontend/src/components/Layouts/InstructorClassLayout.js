import React, { useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import Hamburger from "../Shared/Hamburger";
import { CSSTransition } from "react-transition-group";
import ClassSidebar from "../Shared/ClassSidebar";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const ClassLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  let { classId } = useParams();

  // Side Bar config
  const sideBarConfig = [
    { name: "Invite Link", link: `/classes/${classId}/request` },
    { name: "Lessons", link: `/instructors/classes/${classId}/lessons` },
    {
      name: "Pending Students",
      link: `/instructors/classes/${classId}/students/pending`,
    },
    {
      name: "Students Lists",
      link: `/instructors/classes/${classId}/students`,
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
