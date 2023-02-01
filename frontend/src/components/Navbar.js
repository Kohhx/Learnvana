import React from "react";
import { Link, NavLink } from "react-router-dom"

const Navbar = () => {

  const activeStyle =  ({isActive}) => isActive ? {color: "red"} : undefined;

  return (
    <div className="w-screen h-16 bg-gray-500 px-7 flex items-center">
      <div className="flex-1"><Link to="/">Learnava Logo</Link></div>
      <ul className="flex gap-4">
        <li><NavLink to="/" style={ activeStyle }>Home</NavLink></li>
        <li><NavLink to="/classes/dashboard" style={ activeStyle }>Dashboard</NavLink></li>
        <li><NavLink to="/users/login" style={ activeStyle }>Login</NavLink></li>
        <li><NavLink to="/users/signup" style={ activeStyle }>Sign Up</NavLink></li>
      </ul>
    </div>
  );
};

export default Navbar;
