import React, { useCallback, useReducer, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import { FaUser } from "react-icons/fa";
import Validator from "../utilities/Validator";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { newLesson, reset } from "../features/instructor/instructorSlice";
import useThunk from "../hooks/useThunkHook";
import useForm from "../hooks/useFormHook";

const Lessons = () => {
  // Use form hook for form handling
  const [formState, formHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      content: {
        value: "",
        isValid: false,
      },
      objective: {
        value: "",
        isValid: false,
      },
      date: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
      images: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  let { classId } = useParams();
  const navigate = useNavigate();


  // Use Thunk hook for createAsyncThunk instructor profile create function
  const [
    doCreateLessonProfile,
    CreateLessonLoading,
    CreateLessonSuccess,
    CreateLessonError,
  ] = useThunk(newLesson);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState);

    if (!formState.formisValid) {
      toast.error("Form error. Please fill in the form again");
      return;
    }

    // If all pass then we submit login form to backend
    const newLessonData = {
      title: formState.inputs.title.value,
      content: formState.inputs.content.value,
      objective: formState.inputs.objective.value,
      date: formState.inputs.date.value,
      time: formState.inputs.time.value,
      images: formState.inputs.images.value,
      classId
    };
    doCreateLessonProfile(newLessonData);
    // classDispatch(newClass(newClassData));s
  };

  useEffect(() => {
    if (CreateLessonSuccess) {
      navigate(`/instructor/classes/${classId}`);
    }
  }, [navigate, CreateLessonSuccess]);

  // Display loading spinner based on loading state
  if (CreateLessonLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="text-center">
        <h1>
          <FaUser className="inline mr-3" /> Create lesson
        </h1>
        <p>Please create a lesson</p>
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
        <Input
          id="content"
          type="content"
          label="Content"
          placeholder="Enter content"
          // errorMessage="Please enter a valid email"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="objective"
          type="ojective"
          label="objective"
          placeholder="Enter objective"
          // errorMessage="Please enter a valid password"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="date"
          type="date"
          label="Date"
          placeholder="Enter date"
          // errorMessage="Please enter a valid password"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="time"
          type="time"
          label="Time"
          placeholder="Enter time"
          // errorMessage="Please enter a valid password"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={formHandler}
        ></Input>
        <Input
          id="images"
          type="images"
          label="Images"
          placeholder="Attach images"
          // errorMessage="Please enter a valid password"
          validators={[Validator.VALIDATOR_REQUIRE()]}
          formHandler={formHandler}
        ></Input>
        <Button primary rounded>
          Create lesson
        </Button>
      </form>
    </div>
  );
};

export default Lessons;
