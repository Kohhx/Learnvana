import React, { useState }  from "react";
import "./Hamburger.css";

const Hamburger = ({ isOpen, onClick, classNames}) => {

  return (
    <div className={`${classNames ? classNames : ""} hamburger-icon`} onClick={onClick}>
      <div className="hamburger-container">
        <span className={`hamburger-line ${isOpen && "active"}`}></span>
      </div>
    </div>
  );
};

export default Hamburger;
