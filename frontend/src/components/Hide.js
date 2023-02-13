import React, { useState } from "react";

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
      <button onClick={toggleShow}>{buttonText}</button>
    </div>
  )
}

export default Hide
