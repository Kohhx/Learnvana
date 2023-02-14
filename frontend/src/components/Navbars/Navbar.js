import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import Navbarpublic from "./Navbarpublic";
import Navbarinstructor from "./Navbarinstructor.js";
import Navbarstudent from "./Navbarstudent";
import Navbarguardian from "./Navbarguardian";
import DropDown from "../Shared/Dropdown";

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

  // Dropdown config
  const dropdownConfig = [
    { name: "Update user", link: `/users/update` },
    { name: "Logout", button: <button onClick={handleClick}>Logout</button> },
  ];

  return (
    <div className="w-screen h-16 bg-gray-500 px-7 flex items-center">
      <div className="flex-1">
        <Link to="/">Learnava Logo</Link>
      </div>
      <ul className="flex gap-4">
        {navContent}
        {user && (
          <DropDown configs={dropdownConfig}>
            <img
              className="rounded-full w-[30px] h-[30px]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTugu0kegXOT1Gh1sgDVHvYjkGW29w19Hl9gQ&usqp=CAU"
              alt=""
            />
          </DropDown>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
