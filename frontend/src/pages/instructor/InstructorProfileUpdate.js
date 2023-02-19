import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import InputV2 from "../../components/InputV2";
import SelectV2 from "../../components/SelectV2";
import Validator from "../../utilities/Validator";
import { toast } from "react-toastify";
import useThunk from "../../hooks/useThunkHook";
import useForm from "../../hooks/useFormHook";
import { useSelector } from "react-redux";
import { updateInstructorProfile } from "../../features/instructor/instructorSlice";

const InstructorProfileUpdate = () => {
  const [fileState, setFileState] = useState();

  // Initalize navigate
  const navigate = useNavigate();

  // Get User state
  const { user } = useSelector((state) => state.auth);

  // Get instructor ID from params
  const { _id: instructorId } = user.profiles;
  console.log(instructorId);

  // Use Thunk hook for createAsyncThunk to update instructor profile create function
  const [
    doUpdateInstructorProfile,
    updateInstructorProfileLoading,
    updateInstructorProfileSuccess,
    updateInstructorProfileError,
  ] = useThunk(updateInstructorProfile);

  // Use form hook for form handling
  const {
    formState,
    resetFormHandler,
    changeHandler,
    focusHandler,
    fillHandler,
    useFormHandler,
  } = useForm(
    {
      avatar: { value: null, messages: [], isValid: false, isFocus: false },
      first_name: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      last_name: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      gender: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      age: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      experience: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
    },
    false
  );

  console.log(formState);

  useEffect(() => {
    const oldInstructorProfile = {
      instructorId,
      first_name: user.profiles.first_name,
      last_name: user.profiles.last_name,
      age: user.profiles.age,
      gender: user.profiles.gender,
      email: user.profiles.email,
      experience: user.profiles.experience,
    };
    console.log("Old", oldInstructorProfile);
    fillHandler(oldInstructorProfile);
  }, []);

  useEffect(() => {
    if (updateInstructorProfileSuccess) {
      navigate("/");
    }
  }, [updateInstructorProfileSuccess]);

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
      gender: formState.inputs.gender.value,
      age: formState.inputs.age.value,
      email: user.email,
      experience: formState.inputs.experience.value,
      avatar: formState.inputs.avatar.value,
    };
    console.log(newInstructorProfile);

    doUpdateInstructorProfile(newInstructorProfile);
  };
  return (
    <div>
      <div className="text-center">
        <h1>Update Instructor Profile</h1>
        <p>Fill in profile details</p>
      </div>
      <form onSubmit={updateUserSubmitHandler}>
        <InputV2
          id="avatar"
          type="file"
          label="Avatar Image"
          validators={[]}
          formHandler={useFormHandler}
          onChange={(e) => changeHandler(e, "avatar", [])}
        ></InputV2>
        <InputV2
          id="first_name"
          type="text"
          label="First_name"
          placeholder="Enter first_name"
          onFocus={() => focusHandler("first_name")}
          onChange={(e) =>
            changeHandler(e, "first_name", [Validator.VALIDATOR_REQUIRE()])
          }
          value={formState.inputs.first_name.value}
          isFocus={formState.inputs.first_name.isFocus}
          isValid={formState.inputs.first_name.isValid}
          errorMessages={formState.inputs.first_name.messages}
        ></InputV2>
        <InputV2
          id="last_name"
          type="text"
          label="Last_name"
          placeholder="Enter last_name"
          onFocus={() => focusHandler("last_name")}
          onChange={(e) =>
            changeHandler(e, "last_name", [Validator.VALIDATOR_REQUIRE()])
          }
          value={formState.inputs.last_name.value}
          isFocus={formState.inputs.last_name.isFocus}
          isValid={formState.inputs.last_name.isValid}
          errorMessages={formState.inputs.last_name.messages}
        ></InputV2>
        <SelectV2
          id="gender"
          label="Gender"
          options={[
            {
              display: "male",
              value: "male",
            },
            {
              display: "female",
              value: "female",
            },
          ]}
          onFocus={() => focusHandler("gender")}
          onChange={(e) =>
            changeHandler(e, "gender", [Validator.VALIDATOR_REQUIRE()])
          }
          value={formState.inputs.gender.value}
          isFocus={formState.inputs.gender.isFocus}
          isValid={formState.inputs.gender.isValid}
          errorMessages={formState.inputs.gender.messages}
        />
        <InputV2
          id="age"
          type="number"
          label="Age"
          placeholder="Enter age"
          onFocus={() => focusHandler("age")}
          onChange={(e) =>
            changeHandler(e, "age", [Validator.VALIDATOR_REQUIRE()])
          }
          value={formState.inputs.age.value}
          isFocus={formState.inputs.age.isFocus}
          isValid={formState.inputs.age.isValid}
          errorMessages={formState.inputs.age.messages}
        ></InputV2>
        <InputV2
          id="experience"
          type="textarea"
          label="Experience"
          placeholder="Share your experience"
          onFocus={() => focusHandler("experience")}
          onChange={(e) =>
            changeHandler(e, "experience", [Validator.VALIDATOR_REQUIRE()])
          }
          value={formState.inputs.experience.value}
          isFocus={formState.inputs.experience.isFocus}
          isValid={formState.inputs.experience.isValid}
          errorMessages={formState.inputs.experience.messages}
        ></InputV2>
        <Button primary rounded>
          Update
        </Button>
      </form>
    </div>
  );
};

export default InstructorProfileUpdate;
