import React, { useState }  from "react";
import "./Hamburger.css";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
      <div className="hamburger-container">
        {/* <span className={`hamburger-line top-line ${isOpen && "active"}`}></span>
        <span className={`hamburger-line middle-line ${isOpen && "active"}`}></span>
        <span className={`hamburger-line bottom-line ${isOpen && "active"}`}></span> */}
        <span className={`hamburger-line ${isOpen && "active"}`}></span>
      </div>
    </div>
  );
};

export default Hamburger;
