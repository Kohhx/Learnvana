import React, { useState, useCallback, useReducer } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import { FaUser } from "react-icons/fa";
import Validator from "../utilities/Validator";

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

const Signup = () => {
  const formInitialState = {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      role: {
        value: "",
        isValid: false,
      },
  };

  // const formInitialState = {
  //   inputs: {
  //     email: {
  //       value: "",
  //       isValid: false,
  //     },
  //     password: {
  //       value: "",
  //       isValid: false,
  //     },
  //     role: {
  //       value: "",
  //       isValid: false,
  //     },
  //   },
  //   formisValid: false,
  // };

  const [formState, dispatch] = useReducer(formReducer, formInitialState);

  const [inputData, setInputData] = useState(formInitialState);

  // Handle all changes from all input and get back value and validity
  // Must use call back or go into infinite loop
  const formHandler = useCallback((input) => {
    console.log(inputData)
    setInputData({
      ...inputData,
      [input.id]: { value: input.payload.value, isValid: input.payload.isValid },
    });
console.log(input)
    // dispatch({type: "INPUT_CHANGE", payload: input.payload, id: input.id})
  }, [inputData]);

  const submitHandler = (event) => {
    event.preventDefault();
    // console.log(formState);
    console.log(inputData);
  };

  return (
    <div>
      <div className="text-center">
        <h1>
          <FaUser className="inline mr-3" /> Register
        </h1>
        <p>Please create an account</p>
      </div>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Enter email"
          // errorMessage="Please enter a valid email"
          validators={[
            Validator.VALIDATOR_EMAIL(),
            Validator.VALIDATOR_REQUIRE(),
          ]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Please enter password"
          // errorMessage="Please enter a valid password"
          validators={[
            Validator.VALIDATOR_REQUIRE(),
            Validator.VALIDATOR_MINLENGTH(6),
          ]}
          formHandler={formHandler}
        ></Input>
        <Select
          id="role"
          label="Role"
          options={["Student", "Guardian", "Instructor"]}
          validators={[
            Validator.VALIDATOR_CONTAIN(["Student", "Guardian", "Instructor"]),
          ]}
          formHandler={formHandler}
        />
        <Button primary rounded>
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
