import React, { useCallback, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import { FaUser } from "react-icons/fa";
import Validator from "../utilities/Validator";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux"
import { signUp, reset } from "../features/auth/authSlice";

// Reducer function
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
    inputs: {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      password2: {
        value: "",
        isValid: true,
      },
      role: {
        value: "",
        isValid: false,
      },
    },
    formisValid: false,
  };

  const [formState, dispatch] = useReducer(formReducer, formInitialState);
  const authDispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector( (state) => state.auth);
  // const aaa = useSelector( (state) => state.auth);
// console.log(aaa)

  // Handle all changes from all input and get back value and validity
  // Must use call back or go into infinite loop
  const formHandler = useCallback((input) => {
    dispatch({ type: "INPUT_CHANGE", payload: input.payload, id: input.id });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
    if (formState.inputs.password.value !== formState.inputs.password2.value) {
      toast.error("Password does not match");
      return;
    }

    if (!formState.formisValid) {
      toast.error("Form error. Please fill in the form again");
      return;
    }

    // If all pass then we submit login form to backend
    const newUser = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      role: formState.inputs.role.value.toLowerCase(),
    }
    authDispatch(signUp(newUser))
  };

  useEffect(() => {

    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      console.log('Helloooo')
      navigate("/");
    }
  }, [isError, isSuccess, user, message, navigate]);

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
        <Input
          id="password2"
          type="password"
          label="Confirm Password"
          placeholder="Please enter password again"
          validators={[]}
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
