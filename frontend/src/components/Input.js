import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Validator from "../utilities/Validator";

const Input = ({
  id,
  type,
  textarea,
  label,
  placeholder,
  errorMessage,
  validators,
  disableErrorMessages,
  formHandler,
  reset,
  onChange,
  value,
  ...rest
}) => {
  const initialState = {
    value: "",
    isValid: false,
    isFocus: false,
    errorMessages: [],
  };

  const [inputState, setInputState] = useState(initialState);
  // const resetHandler = () => {
  //   setInputState(initialState);
  // };
  useEffect(() => {
      setInputState(initialState);
  }, [reset]);

  const changehandler = (event) => {
    if (event.target.type === "file") {
      const [isInputValid, validatorMessages] = Validator.validate(
        event.target.files[0],
        validators
      );

      setInputState((state) => ({
        ...inputState,
        value: event.target.files[0],
        isValid: isInputValid,
        errorMessages: validatorMessages,
      }));
    } else {
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
    }
  };

  useEffect(() => {
    formHandler({
      id: id,
      payload: {
        value: inputState.value,
        isValid: inputState.isValid,
      },
    });
  }, [inputState, formHandler, id]);

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
    errors = errorMessage ? (
      <p className={errorClasses}>{errorMessage}</p>
    ) : (
      inputState.errorMessages.map((message, i) => (
        <p id={i} className={errorClasses}>
          - {message}
        </p>
      ))
    );
  }

  

  // Build Classes for input
  const classes = classNames("border block mb-2", rest.className);

  // Inject form content here

  let formContent = (
    <input
      type={type}
      value={value ? value : inputState.value}
      className={classes}
      onChange={onChange ? onChange : changehandler}
      onFocus={focusHandler}
      placeholder={placeholder}
    />
  );

  if (type === "file") {
    formContent = (
      <input
        type={type}
        className={classes}
        onChange={changehandler}
        onFocus={focusHandler}
        placeholder={placeholder}
      />
    );
  }

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
