import React, { useCallback, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import { FaUser } from "react-icons/fa";
import Validator from "../utilities/Validator";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux"
import { UserInstructorProfile } from "../features/auth/authSlice";

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

const InstructorSignUp = () => {
  const formInitialState = {
    inputs: {
      first_name: {
        value: "",
        isValid: false,
      },
      last_name: {
        value: "",
        isValid: false,
      },
      age: {
        value: "",
        isValid: true,
      },
      gender: {
        value: "",
        isValid: false,
      },
      experience: {
        value: "",
        isValid: false,
      },
    },
    formisValid: false,
  };

  const [formState, dispatch] = useReducer(formReducer, formInitialState);
  const authDispatch = useDispatch();
  const navigate = useNavigate();
  const { user, instructorProfileSuccess, isLoading, isError, isSuccess, message } = useSelector( (state) => state.auth);
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

    if (!formState.formisValid) {
      toast.error("Form error. Please fill in the form again");
      return;
    }

    // If all pass then we submit login form to backend
    const newInstructorProfile = {
      first_name: formState.inputs.first_name.value,
      last_name: formState.inputs.last_name.value,
      age: formState.inputs.age.value,
      gender: formState.inputs.gender.value,
      experience: formState.inputs.experience.value,
    }
    authDispatch(UserInstructorProfile(newInstructorProfile))
  };

  useEffect(() => {

    if (isError) {
      toast.error(message);
    }
    console.log(user)
    console.log(isSuccess)
    console.log(instructorProfileSuccess)
    if (isSuccess && instructorProfileSuccess && user) {
      console.log('Instructor profile created')
      console.log(user.instructorprofile)
      navigate("/");
    }
  }, [isError, isSuccess, instructorProfileSuccess, message, navigate]);

  return (
    <div>
      <div className="text-center">
        <h1>
          <FaUser className="inline mr-3" /> Instructor Profile
        </h1>
        <p>Fill in profile details</p>
      </div>
      <form onSubmit={submitHandler}>
        <Input
          id="first_name"
          type="first_name"
          label="First_name"
          placeholder="Enter first_name"
          // errorMessage="Please enter a valid email"
          validators={[
            Validator.VALIDATOR_REQUIRE(),
          ]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="last_name"
          type="last_name"
          label="Last_name"
          placeholder="Enter last_name"
          // errorMessage="Please enter a valid password"
          validators={[
            Validator.VALIDATOR_REQUIRE(),
          ]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="age"
          type="age"
          label="Age"
          placeholder="Enter age"
          validators={[
            Validator.VALIDATOR_REQUIRE(),
          ]}
          formHandler={formHandler}
        ></Input>
        <Select
          id="gender"
          label="Gender"
          options={["male", "female"]}
          validators={[
            Validator.VALIDATOR_CONTAIN(["male", "female"]),
          ]}
          formHandler={formHandler}
        />
        <Input
          id="experience"
          type="experience"
          label="Experience"
          placeholder="Share your experience"
          validators={[
            Validator.VALIDATOR_REQUIRE(),
          ]}
          formHandler={formHandler}
        ></Input>
        <Button primary rounded>
          Confirm
        </Button>
      </form>
    </div>
  );
};

export default InstructorSignUp;
