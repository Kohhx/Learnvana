import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Validator from "../utilities/Validator";

const Select = ({
  id,
  label,
  options,
  disableErrorMessages,
  errorMessage,
  validators,
  formHandler,
  display,
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

  // Use effect to call this function whenever change happen and state change
  useEffect(() => {
    formHandler({
      id: id,
      payload: {
        value: selectState.value,
        isValid: selectState.isValid,
      },
    });
  }, [selectState, formHandler, id]);

  // Build Error
  const errorClasses = "text-red-500";
  let errors = null;
  if (!disableErrorMessages) {
    errors = errorMessage ? (
      <p className={errorClasses}>{errorMessage}</p>
    ) : (
      selectState.errorMessages.map((message, i) => (
        <p id={i} className={errorClasses}>
          - {message}
        </p>
      ))
    );
  }

  // Build Classes for input
  const classes = classNames("border", rest.className);

  // Create select JSX content
  const formContent = (
    // <select className={classes} onChange={changeHandler} onFocus={focusHandler}>
    <select className={classes} onChange={changeHandler} onFocus={focusHandler}>
      <option value="nil">{display}</option>
      {options.map((option, i) => (
        <option id={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  return (
    <>
      {label && <label htmlFor="" className="block">{label}</label>}
      <div className="text-center">
      {formContent}
      </div>
      {selectState.isFocus && !selectState.isValid && errors}
    </>
  );
};

export default Select;
