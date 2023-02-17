import React from 'react'
import {  NavLink } from "react-router-dom";

const Navbarguardian = ({activeStyle}) => {
  return (
    <>
    <h1>Guardian</h1>
      <li>
        <NavLink to="/" style={activeStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/guardians/dashboard" style={activeStyle}>
          Dashboard
        </NavLink>
      </li>
    </>
  )
}

export default Navbarguardian
