import React from 'react'
import {  NavLink } from "react-router-dom";

const Navbarpublic = ({activeStyle}) => {
  return (
    <>
      <h1>Public</h1>
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
  )
}

export default Navbarpublic
