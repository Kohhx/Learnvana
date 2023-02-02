import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import Navbarpublic from "./Navbarpublic";
import Navbarinstructor from "./Navbarinstructor.js";
import Navbarstudent from "./Navbarstudent";
import Navbarguardian from "./Navbarguardian";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const authDispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    authDispatch(logout());
    authDispatch(reset());
    navigate("/");
  };

  const activeStyle = ({ isActive }) =>
    isActive ? { color: "red" } : undefined;

  // Select nav content based on login and roles

  let navContent;
  if (user) {
    switch (user.role) {
      case "instructor":
        navContent = <Navbarinstructor activeStyle={activeStyle} />;
        break;
      case "student":
        navContent = <Navbarstudent activeStyle={activeStyle} />;
        break;
      case "guardian":
        navContent = <Navbarguardian activeStyle={activeStyle} />;
        break;
      default:
    }
  } else {
    navContent = <Navbarpublic activeStyle={activeStyle} />;
  }

  const logoutContent = (
    <li>
      <button onClick={handleClick}>Logout</button>
    </li>
  );

  return (
    <div className="w-screen h-16 bg-gray-500 px-7 flex items-center">
      <div className="flex-1">
        <Link to="/">Learnava Logo</Link>
      </div>
      <ul className="flex gap-4">
        {navContent}
        {user && logoutContent}
      </ul>
    </div>
  );
};

export default Navbar;
