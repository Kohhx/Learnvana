import React, { useReducer, useCallback } from "react";
import Validator from "../utilities/Validator";
import { axiosInstance } from "../config/axios";

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

    case "ONCHANGE":
      let formIsValid2 = true;
      for (const inputId in state.inputs) {
        if (inputId === action.id) {
          formIsValid2 = formIsValid2 && action.payload.isValid;
        } else {
          formIsValid2 = formIsValid2 && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: {
            ...state.inputs[action.id],
            value: action.payload.value,
            messages: action.payload.errorMessages,
            isValid: action.payload.isValid,
          },
        },
        formisValid: formIsValid2,
      };

    case "ONFOCUS":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: {
            ...state.inputs[action.id],
            isFocus: true,
          },
        },
      };

    case "EDITORONCHANGE":
      let formIsValid3 = true;
      for (const inputId in state.inputs) {
        if (inputId === action.id) {
          formIsValid3 = formIsValid3 && action.payload.isValid;
        } else {
          formIsValid3 = formIsValid3 && state.inputs[inputId].isValid;
        }
      }

      const oldBlocks = state.inputs[action.id].value.blocks;
      const newBlocks = action.payload.value.blocks;

      deleteType(oldBlocks, newBlocks, "image", "utilities/deletefile");
      deleteType(oldBlocks, newBlocks, "attaches", "utilities/deletefile");
      deleteType(oldBlocks, newBlocks, "video", "utilities/deletefile");

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: {
            ...state.inputs[action.id],
            value: action.payload.value,
            messages: action.payload.errorMessages,
            isValid: action.payload.isValid,
          },
        },
        formisValid: formIsValid3,
      };
    case "RESET":
      return action.payload;

    case "FILL":
      const copyState = { ...state, formisValid: true };
      for (const inputId in state.inputs) {
        copyState.inputs[inputId].value = action.payload[inputId];
        copyState.inputs[inputId].isValid = true;
      }
      return copyState;

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

  const resetFormHandler = useCallback(() => {
    dispatch({
      type: "RESET",
      payload: {
        inputs: formInitialState,
        formisValid: formInitialValidity,
      },
    });
  }, [formInitialState, formInitialValidity]);

  const changeHandler = (event, id, validators) => {
    console.log(event.target.value);
    console.log(validators);
    let isInputValid;
    let validatorMessages;
    let value = "";
    if (event.target.type === "file") {
      [isInputValid, validatorMessages] = Validator.validate(
        event.target.files[0],
        validators
      );
      value = event.target.files[0];
      console.log(value);
    } else {
      [isInputValid, validatorMessages] = Validator.validate(
        event.target.value,
        validators
      );
      value = event.target.value;
    }
    const payload = {
      value,
      isValid: isInputValid,
      errorMessages: validatorMessages,
    };

    dispatch({ type: "ONCHANGE", payload: payload, id });
  };

  const focusHandler = (id) => {
    dispatch({ type: "ONFOCUS", id });
  };

  const fillHandler = (updateData) => {
    dispatch({ type: "FILL", payload: updateData });
  };

  const editorChangeHandler = (value, id) => {
    const payload = {
      value,
      isValid: true,
      errorMessages: null,
    };

    dispatch({ type: "EDITORONCHANGE", payload: payload, id });
  };

  // return [formState, useFormHandler, resetFormHandler, changehandler];
  return {
    formState,
    useFormHandler,
    resetFormHandler,
    changeHandler,
    focusHandler,
    fillHandler,
    editorChangeHandler,
  };
};

export default useFormHook;

// Helper functions

// Upload photo to backend
const deleteFileBackend = async (URL, public_id, mimetype) => {
  // const URL = `utilities/deletephoto`;

  const { token } = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(
    URL,
    { public_id, mimetype },
    config
  );
  if (response.data) {
    return response.data;
  }
};

const deleteType = (oldBlocks, newBlocks, type, URL) => {
  if (oldBlocks && newBlocks) {
    const oldTypes = oldBlocks.filter((block) => block.type === type);
    const NewTypes = newBlocks.filter((block) => block.type === type);
    if (NewTypes.length < oldTypes.length) {
      const deletedType = oldTypes.filter((oldType) => {
        let flag = true;
        NewTypes.forEach((newType) => {
          if (oldType.id === newType.id) {
            flag = false;
          }
        });
        return flag;
      });

      if (deletedType.length === 1) {
        const { public_id, mimetype } = deletedType[0].data.file;
        deleteFileBackend(URL, public_id, mimetype).then((data) => console.log(data));
      }
    }
  }
};
