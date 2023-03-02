import React from 'react'
import {  NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


const Navbarstudent = ({activeStyle}) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
    <h1>Student</h1>
      <li>
        <NavLink to="/" style={activeStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={`/students/${user.profiles._id}/dashboard`} style={activeStyle}>
          Dashboard
        </NavLink>
      </li>
    </>
  )
}

export default Navbarstudent
