import React, { useCallback, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import { FaUser } from "react-icons/fa";
import Validator from "../utilities/Validator";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { newClass, reset } from "../features/class/classSlice";

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

const New = () => {
  const formInitialState = {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      status: {
        value: "",
        isValid: false,
      },
      lessons: {
        value: "",
        isValid: false,
      },
      images: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    formisValid: false,
  };

  const [formState, dispatch] = useReducer(formReducer, formInitialState);
  const classDispatch = useDispatch();
  const navigate = useNavigate();
  const { classes, isLoading, isError, classCreateSuccess, message } =
    useSelector((state) => state.class);

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
    const newClassData = {
      title: formState.inputs.title.value,
      status: formState.inputs.status.value,
      lessons: formState.inputs.lessons.value,
      images: formState.inputs.images.value,
      address: formState.inputs.address.value,
    };

    classDispatch(newClass(newClassData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    console.log(classCreateSuccess);
    if (classCreateSuccess) {
      console.log("class created");
      // classDispatch(reset())
      navigate("/classes/dashboard");
      classDispatch(reset());
    }
  }, [isError, classCreateSuccess, message, navigate, classDispatch]);

  return (
    <div>
      <div className="text-center">
        <h1>
          <FaUser className="inline mr-3" /> Create class
        </h1>
        <p>Please create a class</p>
      </div>
      <form onSubmit={submitHandler}>
        <Input
          id="title"
          type="title"
          label="Title"
          placeholder="Enter title"
          // errorMessage="Please enter a valid email"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={formHandler}
        ></Input>
        <Select
          id="status"
          label="Status"
          options={["Not started", "In progress", "Closed"]}
          validators={[
            Validator.VALIDATOR_CONTAIN([
              "Not started",
              "In progress",
              "Closed",
            ]),
          ]}
          formHandler={formHandler}
        />
        <Input
          id="lessons"
          type="lessons"
          label="Number of lessons"
          placeholder="e.g. 2"
          // errorMessage="Please enter a valid password"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="images"
          type="images"
          label="Attach images"
          placeholder="images"
          // errorMessage="Please enter a valid password"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="address"
          type="address"
          label="Address"
          placeholder="Address"
          // errorMessage="Please enter a valid password"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={formHandler}
        ></Input>
        <Button primary rounded>
          Confirm
        </Button>
      </form>
    </div>
  );
};

export default New;
