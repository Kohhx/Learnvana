import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Validator, { validate } from "../utilities/Validator";

const Select = ({
  id,
  label,
  options,
  disableErrorMessages,
  errorMessage,
  validators,
  ...rest
}) => {
  const [selectState, setSelectState] = useState({
    value: "",
    isValid: false,
    isFocus: false,
    errorMessages: [],
  });

  // Handler functions for select
  const changeHandler = (event) => {
    console.log(event.target.value);
    const [isInputValid, validatorMessages] = Validator.validate(
      event.target.value,
      validators
    );
    setSelectState((state) => ({
      ...selectState,
      value: event.target.value,
      isValid: isInputValid,
      errorMessages: validatorMessages,
    }));
  };

  const focusHandler = () => {
    setSelectState((state) => ({
      ...selectState,
      isFocus: true,
    }));
  };

  // Build Error
  const errorClasses = "text-red-500";
  let errors = null;
  if (!disableErrorMessages) {
    errors = errorMessage ? (
      <p className={errorClasses}>{errorMessage}</p>
    ) : (
      selectState.errorMessages.map((message) => (
        <p className={errorClasses}>- {message}</p>
      ))
    );
  }

  // Build Classes for input
  const classes = classNames("border block mb-2", rest.className);

  // Create select JSX content
  const formContent = (
    <select className={classes} onChange={changeHandler} onFocus={focusHandler}>
      <option value="nil">Select a {label}</option>
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  );

  return (
    <div className="mb-3">
      <label htmlFor="">{label}</label>
      {formContent}
      {selectState.isFocus && !selectState.isValid && errors}
    </div>
  );
};

export default Select;
