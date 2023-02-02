import React from 'react'
import {  NavLink } from "react-router-dom";

const Navbarstudent = ({activeStyle}) => {
  return (
    <>
    <h1>Student</h1>
      <li>
        <NavLink to="/" style={activeStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/classes/dashboard" style={activeStyle}>
          Dashboard
        </NavLink>
      </li>
    </>
  )
}

export default Navbarstudent
