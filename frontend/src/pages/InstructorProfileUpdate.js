import React, { useCallback, useReducer, useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate, useParams} from "react-router-dom";
import Input from "../components/Input";
import Validator from "../utilities/Validator";
import { toast } from "react-toastify";
import useThunk from "../hooks/useThunkHook";
import useForm from "../hooks/useFormHook";
import { useSelector } from "react-redux";
import { updateInstructorProfile } from "../features/instructor/instructorSlice";

const InstructorProfileUpdate = () => {
  const [fileState, setFileState] = useState();

  // Get instructor ID from params
  const { instructorId }= useParams();


  // Initalize navigate
  const navigate = useNavigate();

  // Get User state
  const { user } = useSelector((state) => state.auth);

  // Use Thunk hook for createAsyncThunk to update instructor profile create function
  const [
    doUpdateInstructorProfile,
    updateInstructorProfileLoading,
    updateInstructorProfileSuccess,
    updateInstructorProfileError,
  ] = useThunk(updateInstructorProfile);

  // Use form hook for form handling
  const [formState, formHandler] = useForm(
    {
      avatar: { value: "", isValid: false },
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
      experience: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  <input onChange={(e) => setFileState(e.target.files[0])} type="file" />;

  const updateUserSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);

    if (!formState.formisValid) {
      toast.error("Form error. Please fill in the form again");
      return;
    }

    // If all pass then we submit login form to backend
    const newInstructorProfile = {
      instructorId,
      first_name: formState.inputs.first_name.value,
      last_name: formState.inputs.last_name.value,
      age: formState.inputs.age.value,
      email: user.email,
      experience: formState.inputs.experience.value,
      avatar: formState.inputs.avatar.value,
    };

    doUpdateInstructorProfile(newInstructorProfile)
  };
  return (
    <div>
      <div className="text-center">
        <h1>Update Instructor Profile</h1>
        <p>Fill in profile details</p>
      </div>
      <form onSubmit={updateUserSubmitHandler}>
        <Input
          id="avatar"
          type="file"
          label="Avatar Image"
          validators={[]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="first_name"
          type="text"
          label="First_name"
          placeholder="Enter first_name"
          // errorMessage="Please enter a valid email"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="last_name"
          type="text"
          label="Last_name"
          placeholder="Enter last_name"
          // errorMessage="Please enter a valid password"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="age"
          type="number"
          label="Age"
          placeholder="Enter age"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="experience"
          type="text"
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

export default InstructorProfileUpdate;
