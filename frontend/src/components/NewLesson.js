import React, { useCallback, useReducer, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputV2 from "../components/InputV2";
import Button from "../components/Button";
import { FaUser } from "react-icons/fa";
import Validator from "../utilities/Validator";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { newLesson, reset } from "../features/instructor/instructorSlice";
import useThunk from "../hooks/useThunkHook";
import useForm from "../hooks/useFormHook";
import Editor from "./Editor/Editor";

const NewLesson = () => {
  // Use form hook for form handling
  const { formState, editorChangeHandler, changeHandler, focusHandler } =
    useForm(
      {
        title: {
          value: "",
          isValid: false,
          isFocus: false,
          messages: [],
        },
        content: {
          value: [],
          isValid: true,
          isFocus: false,
          messages: [],
        },
        objective: {
          value: "",
          isValid: false,
          isFocus: false,
          messages: [],
        },
        date: {
          value: "",
          isValid: false,
          isFocus: false,
          messages: [],
        },
        time: {
          value: "",
          isValid: false,
          isFocus: false,
          messages: [],
        },
      },
      false
    );

  console.log(formState);

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
      classId,
    };
    doCreateLessonProfile(newLessonData);
    // classDispatch(newClass(newClassData));s
  };

  // const refresh = () => window.location.reload(true)

  useEffect(() => {
    if (CreateLessonSuccess) {
      console.log("Lesson created successfully")
      // navigate(`/instructors/classes/${classId}/lessons`);
      // window.location.reload(true);
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
        <InputV2
          id="objective"
          type="text"
          label="Objective"
          placeholder="Enter lesson objective"
          onFocus={() => focusHandler("objective")}
          onChange={(e) =>
            changeHandler(e, "objective", [Validator.VALIDATOR_REQUIRE()])
          }
          value={formState.inputs.objective.value}
          isFocus={formState.inputs.objective.isFocus}
          isValid={formState.inputs.objective.isValid}
          errorMessages={formState.inputs.objective.messages}
        ></InputV2>
        <label>Content</label>
        <div className="border py-5">
          <Editor
            id="content"
            onChangeEditor={editorChangeHandler}
            data={formState.inputs.content.value}
          />
        </div>
        <InputV2
          id="date"
          type="date"
          label="Date"
          placeholder="Enter date"
          onFocus={() => focusHandler("date")}
          onChange={(e) =>
            changeHandler(e, "date", [Validator.VALIDATOR_REQUIRE()])
          }
          value={formState.inputs.date.value}
          isFocus={formState.inputs.date.isFocus}
          isValid={formState.inputs.date.isValid}
          errorMessages={formState.inputs.date.messages}
        ></InputV2>
        <InputV2
          id="time"
          type="time"
          label="Time"
          placeholder="Enter time"
          onFocus={() => focusHandler("time")}
          onChange={(e) =>
            changeHandler(e, "time", [Validator.VALIDATOR_REQUIRE()])
          }
          value={formState.inputs.time.value}
          isFocus={formState.inputs.time.isFocus}
          isValid={formState.inputs.time.isValid}
          errorMessages={formState.inputs.time.messages}
        ></InputV2>
        <Button secondary rounded>
          Add lesson
        </Button>
      </form>
    </div>
  );
};

export default NewLesson;
