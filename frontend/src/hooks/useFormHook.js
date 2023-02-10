import React, { useReducer, useCallback } from "react";

// Reducer function
//reducer function is always called outside
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.id) {
          formIsValid = formIsValid && action.payload.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          // brackets
          [action.id]: {
            value: action.payload.value,
            isValid: action.payload.isValid,
          },
        },
        formisValid: formIsValid,
      };

    default:
      return state;
  }
};

// usereducer(formreducer, (initial state values))
const useFormHook = (formInitialState, formInitialValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: formInitialState,
    formisValid: formInitialValidity,
  });

  // Handle form input change dispatch({ action type, payload });
  const useFormHandler = useCallback((input) => {
    dispatch({ type: "INPUT_CHANGE", payload: input.payload, id: input.id });
  }, []);

  return [formState, useFormHandler];
};

export default useFormHook;
