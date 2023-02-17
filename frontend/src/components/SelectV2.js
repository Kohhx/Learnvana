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

  // Build Classes for input
  const classes = classNames("border block mb-2", rest.className);

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
    <div className="mb-3">
      <label htmlFor="">{label}</label>
      {formContent}
      {isFocus && !isValid && errors}
    </div>
  );
};

export default SelectV2;
