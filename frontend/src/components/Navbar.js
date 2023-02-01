import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

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
  const navContent = user ? (
    <>
      <li>
        <button onClick={handleClick}>Logout</button>
      </li>
    </>
  ) : (
    <>
      <li>
        <NavLink to="/" style={activeStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/users/login" style={activeStyle}>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/users/signup" style={activeStyle}>
          Sign Up
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="w-screen h-16 bg-gray-500 px-7 flex items-center">
      <div className="flex-1">
        <Link to="/">Learnava Logo</Link>
      </div>
      <ul className="flex gap-4">{navContent}</ul>
    </div>
  );
};

export default Navbar;
