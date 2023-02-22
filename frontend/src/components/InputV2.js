import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Validator from "../utilities/Validator";

const InputV2 = ({
  id,
  type,
  textarea,
  label,
  errorMessages,
  isFocus,
  isValid,
  placeholder,
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
  const classes = classNames("border block mb-2 w-full", rest.className);

  // Inject form content here

  let formContent = <input type={type} placeholder={placeholder} className={classes} {...rest} />;

  if (type === "file") {
    formContent = <input type={type} placeholder={placeholder} className={classes} {...rest} />;
  }

  if (type === "textarea") {
    formContent = <textarea className={classes} cols="30" rows="10" {...rest} >{rest.value}</textarea>;
  }

  return (
    <div className="mb-3">
      <label htmlFor="">{label}</label>
      {formContent}
      {isFocus && !isValid && errors}
    </div>
  );
};


export default InputV2;
