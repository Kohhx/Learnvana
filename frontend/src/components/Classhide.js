import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Button from "./Button";

const Classhide = ({ children }) => {

  // React state to manage visibility
  const [show, setShow] = useState();

  // function to toggle the boolean value
  function toggleShow() {
    setShow(!show);
  }


  return (
    <div className="component-container">
      <RiArrowDropDownLine onClick={toggleShow} className="text-2xl hover:opacity-30" />
      {show && children}
    </div>
  )
}

export default Classhide
