import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const CheckProfileCreation = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  let navRoute = "/";
  const userRole = user.role;
  console.log(userRole)
  navigate('/users/login')
  // if (!user.profiles) {
  //   switch (userRole) {
  //     case "instructor":
  //       // navRoute =  navigate("/instructors/dashboard/signup");
  //       navRoute =  navigate("/");
  //       break;
  //     default:
  //   }
  // }

  console.log("NavRoute", navRoute)
  return navRoute;
};

export default CheckProfileCreation;
