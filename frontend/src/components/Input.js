import React, { useState } from "react";
import classNames from "classnames";
import Validator from "../utilities/Validator";
console.log(Validator);

const Input = ({
  type,
  textarea,
  label,
  placeholder,
  errorMessage,
  ...rest
}) => {
  const [inputState, setInputState] = useState({
    value: "",
    isValid: false,
    isFocus: false,
  });

  const changehandler = (event) => {
    const isInputValid = Validator.validate(event.target.value, [
      Validator.VALIDATOR_REQUIRE(),
    ]);
    setInputState((state) => ({
      ...inputState,
      value: event.target.value,
      isValid: isInputValid,
    }));
  };

  const focusHandler = () => {
    setInputState((state) => ({
      ...inputState,
      isFocus: true,
    }));
    console.log("Blur");
  };

  const classes = classNames("border block mb-2");

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
    <div>
      <label htmlFor="">{label}</label>
      {formContent}
      {inputState.isFocus && !inputState.isValid && errorMessage}
    </div>
  );
};

export default Input;
