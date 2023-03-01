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
import { updateInstructorClass} from "../../features/instructor/instructorSlice";

const InstructorClassUpdate = () => {
  const { user } = useSelector((state) => state.auth);
  const { instructorClasses } = useSelector((state) => state.instructor);

  // Initalize navigate
  const navigate = useNavigate();

  // Get class ID from params
  let { classId } = useParams();

  const classFound = instructorClasses.find(oneClass => oneClass._id === classId);

  if (!classFound) {
    toast.error("class does not exist");
  };

   // Use Thunk hook for createAsyncThunk to update instructor profile create function
   const [
    doUpdateInstructorClass,
    updateInstructorClassLoading,
    updateInstructorClassSuccess,
    updateInstructorClassError,
  ] = useThunk(updateInstructorClass);


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
      title: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      status: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      images: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      address: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
    },
    false
  );

  useEffect(() => {
    const oldInstructorClass = {
      classId,
      title: classFound.title,
      status: classFound.status,
      images: classFound.images,
      address: classFound.address,

    };
    // console.log("Old", oldInstructorProfile);
    fillHandler(oldInstructorClass);
  }, []);

  useEffect(() => {
    if (updateInstructorClassSuccess) {
      navigate("/instructors/dashboard");
    }
  }, [updateInstructorClassSuccess]);

  const updateUserSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);

    if (!formState.formisValid) {
      toast.error("Form error. Please fill in the form again");
      return;
    }

    // If all pass then we submit login form to backend
    const newClassData = {
      classId,
      title: formState.inputs.title.value,
      status: formState.inputs.status.value,
      images: formState.inputs.images.value,
      address: formState.inputs.address.value,
    };
    console.log(newClassData);

    doUpdateInstructorClass(newClassData);
  };



  return (
    <div className="border w-6/12 mx-auto p-6">
      <div className="text-center  mb-5">
        <h1>Update Instructor class</h1>
        <p>Fill in profile details</p>
      </div>
      <form onSubmit={updateUserSubmitHandler}>
        <InputV2
          id="title"
          type="text"
          label="Title"
          placeholder="Enter title"
          onFocus={() => focusHandler("title")}
          onChange={(e) =>
            changeHandler(e, "title", [Validator.VALIDATOR_REQUIRE()])
          }
          value={formState.inputs.title.value}
          isFocus={formState.inputs.title.isFocus}
          isValid={formState.inputs.title.isValid}
          errorMessages={formState.inputs.title.messages}
        ></InputV2>
        <SelectV2
          id="status"
          label="Status"
          options={[
            {
              display: "Not started",
              value: "Not started",
            },
            {
              display: "In progress",
              value: "In progress",
            },
            {
              display: "Closed",
              value: "Closed",
            },
          ]}
          onFocus={() => focusHandler("status")}
          onChange={(e) =>
            changeHandler(e, "status", [Validator.VALIDATOR_REQUIRE()])
          }
          value={formState.inputs.status.value}
          isFocus={formState.inputs.status.isFocus}
          isValid={formState.inputs.status.isValid}
          errorMessages={formState.inputs.status.messages}
        />
        <InputV2
          id="images"
          type="text"
          label="Images"
          placeholder="Attach image"
          onFocus={() => focusHandler("images")}
          onChange={(e) =>
            changeHandler(e, "images", [Validator.VALIDATOR_REQUIRE()])
          }
          value={formState.inputs.images.value}
          isFocus={formState.inputs.images.isFocus}
          isValid={formState.inputs.images.isValid}
          errorMessages={formState.inputs.images.messages}
        ></InputV2>
        <InputV2
          id="address"
          type="text"
          label="Address"
          placeholder="Add location address"
          onFocus={() => focusHandler("address")}
          onChange={(e) =>
            changeHandler(e, "address", [Validator.VALIDATOR_REQUIRE()])
          }
          value={formState.inputs.address.value}
          isFocus={formState.inputs.address.isFocus}
          isValid={formState.inputs.address.isValid}
          errorMessages={formState.inputs.address.messages}
        ></InputV2>
        <div className="flex justify-end">
          <Button primary rounded>
            Update
          </Button>
        </div>
      </form>
    </div>
  )
}

export default InstructorClassUpdate
