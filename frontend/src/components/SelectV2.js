import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Validator from "../utilities/Validator";

const SelectV2 = ({
  id,
  type,
  textarea,
  label,
  options,
  errorMessages,
  isFocus,
  isValid,
  className,
  ...rest
}) => {
  // Build Error
  const errorClasses = "text-red-500";
  let errors = null;
  if (errorMessages) {
    if (typeof errorMessage === "string") {
      errors = <p className={errorClasses}>{errorMessages}</p>;
    } else {
      errors = errorMessages.map((message, i) => (
        <p id={i} className={errorClasses} key={i}>
          - {message}
        </p>
      ));
    }
  }

  const inputErrorClasses =
  (isFocus && !isValid) ? "bg-red-100 border-2 border-red-400 bg-red-200/40 focus:border-red-400"
  : "";


// Build Classes for input
const classes = classNames(
  "border block mb-2",
  className,
  inputErrorClasses
);

  // // Build Classes for input
  // const classes = classNames("border block mb-2", rest.className);

  // Inject form content here
  const formContent = (
    <select className={classes} {...rest}>
      <option value="">Select a {label}</option>
      {options.map((option, i) => (
        <option id={i} value={option.value} key={i}>{option.display}</option>
      ))}
    </select>
  );

  return (
    <div className="mb-3 w-full">
      <label htmlFor="">{label}</label>
      {formContent}
      {isFocus && !isValid && errors}
    </div>
  );
};

export default SelectV2;
