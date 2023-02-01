import React, { useCallback, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import { FaUser } from "react-icons/fa";
import Validator from "../utilities/Validator";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux"
import { login } from "../features/auth/authSlice";


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

const Login = () => {

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


    const users = JSON.parse(localStorage.getItem("user"));
    const usercheck = users.find(user => (user.email.value === formState.inputs.email.value && user.password.value === formState.inputs.password.value));

    if(usercheck) {
      console.log("Login successful");
    }else {
      console.log("Wrong password or username");
    }

    console.log(usercheck);

    if (!formState.formisValid) {
      toast.error("Form error. Please fill in the form again");
      return;
    }

    // If all pass then we submit login form to backend

    authDispatch(login(usercheck))
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
          <FaUser className="inline mr-3" /> Login
        </h1>
        <p>Please login to your account</p>
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
        <Button primary rounded>
          Login
        </Button>
      </form>
    </div>

  );
};

export default Login;
