import React from 'react'
import {  NavLink } from "react-router-dom";

const NavbarInstructor = ({activeStyle}) => {
  return (
    <>
    <h1>Instructor</h1>
      <li>
        <NavLink to="/" style={activeStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/classes/new" style={activeStyle}>
          Create Class
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

export default NavbarInstructor
