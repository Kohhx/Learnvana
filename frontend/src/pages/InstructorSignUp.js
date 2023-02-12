import React, { useCallback, useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import { FaUser } from "react-icons/fa";
import Validator from "../utilities/Validator";
import { toast } from "react-toastify";
import { UserInstructorProfile } from "../features/instructor/instructorSlice";
import useThunk from "../hooks/useThunkHook";
import useForm from "../hooks/useFormHook";
import { useSelector } from "react-redux"

const InstructorSignUp = () => {
  // Initalize navigate
  const navigate = useNavigate();

  // Get User state
  const { user } = useSelector( state => state.auth)

  // Use form hook for form handling
  const [formState, formHandler] = useForm(
    {
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
    false
  );

  // Use Thunk hook for createAsyncThunk instructor profile create function
  const [
    doCreateInstructorProfile,
    createInstructorProfileLoading,
    createInstructorProfileSuccess,
    createInstructorProfileError,
  ] = useThunk(UserInstructorProfile);

  // Use effect to naviagte upon success
  useEffect(() => {
    if (createInstructorProfileSuccess) {
      navigate("/");
    }
  }, [createInstructorProfileSuccess, navigate]);

  // Form Handlers
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
      email: user.email,
      experience: formState.inputs.experience.value,
    };
    doCreateInstructorProfile(newInstructorProfile);
  };

  // Display loading spinner based on loading state
  if (createInstructorProfileLoading) {
    return <h1>...isLoading</h1>;
  }

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
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="last_name"
          type="last_name"
          label="Last_name"
          placeholder="Enter last_name"
          // errorMessage="Please enter a valid password"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="age"
          type="age"
          label="Age"
          placeholder="Enter age"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={formHandler}
        ></Input>
        <Select
          id="gender"
          label="Gender"
          options={["male", "female"]}
          validators={[Validator.VALIDATOR_CONTAIN(["male", "female"])]}
          formHandler={formHandler}
        />
        <Input
          id="experience"
          type="experience"
          label="Experience"
          placeholder="Share your experience"
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

export default InstructorSignUp;
