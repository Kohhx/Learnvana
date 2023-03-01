import React, { useCallback, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import { FaUser } from "react-icons/fa";
import Validator from "../../utilities/Validator";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { newClass, reset } from "../../features/instructor/instructorSlice";
import useThunk from "../../hooks/useThunkHook";
import useForm from "../../hooks/useFormHook";

const NewClass = () => {
  // Use form hook for form handling
  const {formState, useFormHandler} = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      status: {
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
    false
  );

  const navigate = useNavigate();

  // Use Thunk hook for createAsyncThunk instructor profile create function
  const [
    doCreateClassProfile,
    CreateClassLoading,
    CreateClassSuccess,
    CreateClassError,
  ] = useThunk(newClass);

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
      images: formState.inputs.images.value,
      address: formState.inputs.address.value,
    };
    doCreateClassProfile(newClassData);
  };

  useEffect(() => {
    if (CreateClassSuccess) {
      navigate("/instructors/dashboard");
    }
  }, [navigate, CreateClassSuccess]);

  // Display loading spinner based on loading state
  if (CreateClassLoading) {
    return <h1>Loading...</h1>;
  }

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
          formHandler={useFormHandler}
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
          formHandler={useFormHandler}
        />
        <Input
          id="images"
          type="images"
          label="Attach images"
          placeholder="images"
          // errorMessage="Please enter a valid password"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={useFormHandler}
        ></Input>
        <Input
          id="address"
          type="address"
          label="Address"
          placeholder="Address"
          // errorMessage="Please enter a valid password"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={useFormHandler}
        ></Input>
        <Button primary rounded>
          Confirm
        </Button>
      </form>
    </div>
  );
};

export default NewClass;
