import React from "react";
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="w-screen h-16 bg-gray-500 px-7 flex items-center">
      <div className="flex-1"><Link to="/">Learnava Logo</Link></div>
      <ul className="flex gap-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/users/login">Login</Link></li>
        <li><Link to="/users/signup">Sign Up</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
