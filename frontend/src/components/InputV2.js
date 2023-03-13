import React, { forwardRef } from "react";
import classNames from "classnames";

const InputV2 = React.forwardRef(
  (
    {
      id,
      type,
      textarea,
      label,
      errorMessages,
      isFocus,
      isValid,
      placeholder,
      className,
      ...rest
    },
    ref
  ) => {
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
    // const classes = classNames("border block mb-2 w-full", rest.className);

    // Inject form content here

    let formContent = (
      <input
        type={type}
        placeholder={placeholder}
        className={classes}
        {...rest}
      />
    );

    if (type === "file") {
      formContent = (
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={classes}
          {...rest}
        />
      );
    }

    if (textarea) {
      formContent = (
        <textarea className={classes} cols="30" rows="5" {...rest}>
          {rest.value}
        </textarea>
      );
    }

    return (
      <div className="mb-1 w-full">
        <label className="mb-1" htmlFor="">
          {label}
        </label>
        {formContent}
        {isFocus && !isValid && errors}
      </div>
    );
  }
);

export default InputV2;
