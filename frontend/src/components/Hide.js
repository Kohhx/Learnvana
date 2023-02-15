import React, { useState } from "react";
import Button from "../components/Button";

const Hide = ({ children }) => {

  // React state to manage visibility
  const [show, setShow] = useState();

  // function to toggle the boolean value
  function toggleShow() {
    setShow(!show);
  }
  var buttonText = show ? "Hide" : "Add Lesson";

  return (
    <div className="component-container">
      {show && children}
      <Button primary rounded onClick={toggleShow}>{buttonText}</Button>
    </div>
  )
}

export default Hide
