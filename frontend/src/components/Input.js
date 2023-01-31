import React, { useState } from "react";
import classNames from "classnames";
import Validator from "../utilities/Validator";

const Input = ({
  type,
  textarea,
  label,
  placeholder,
  errorMessage,
  validators,
  disableErrorMessages,
  ...rest
}) => {
  const [inputState, setInputState] = useState({
    value: "",
    isValid: false,
    isFocus: false,
    errorMessages: [],
  });

  const changehandler = (event) => {
    const [isInputValid, validatorMessages] = Validator.validate(
      event.target.value,
      validators
    );

    setInputState((state) => ({
      ...inputState,
      value: event.target.value,
      isValid: isInputValid,
      errorMessages: validatorMessages,
    }));
  };

  const focusHandler = () => {
    setInputState((state) => ({
      ...inputState,
      isFocus: true,
    }));
  };

  // Build Error
  const errorClasses = "text-red-500";
  let errors = null;
  if (!disableErrorMessages) {
    errors = errorMessage
      ? <p className={errorClasses}>{errorMessage}</p>

      : inputState.errorMessages.map((message) => <p className={errorClasses}>- {message}</p>);
  }

  // Build Classes for input
  const classes = classNames("border block mb-2",rest.className);

  // Inject form content here
  let formContent = (
    <input
      type={type}
      value={inputState.value}
      className={classes}
      onChange={changehandler}
      onFocus={focusHandler}
      placeholder={placeholder}
    />
  );

  if (textarea) {
    formContent = <textarea name="" id="" cols="30" rows="10"></textarea>;
  }

  return (
    <div className="mb-3">
      <label htmlFor="">{label}</label>
      {formContent}
      {inputState.isFocus && !inputState.isValid && errors}
    </div>
  );
};

export default Input;
