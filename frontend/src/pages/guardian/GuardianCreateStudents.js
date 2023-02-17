import React, { useEffect, useState } from "react";
import Validator from "../../utilities/Validator";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputV2 from "../../components/InputV2";
import Button from "../../components/Button";
import useThunk from "../../hooks/useThunkHook";
import useForm from "../../hooks/useFormHook";
import SelectV2 from "../../components/SelectV2";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { createGuardianStudents } from "../../features/guardian/guardianSlice";
import { v4 as uuidv4 } from "uuid";

const GuardianCreateStudents = () => {
  // Initalize navigate
  const navigate = useNavigate();

  // Get user from auth.slice
  const { user } = useSelector((state) => state.auth);

  //Student List
  const [studentList, setStudentList] = useState([]);

  // Edit State
  const [isEdit, setIsEdit] = useState({ state: false, id: null });

  // Use form hook for form handling
  // const [formState, formHandler, resetFormHandler, changeHandler] = useForm(
  const {
    formState,
    resetFormHandler,
    changeHandler,
    focusHandler,
    fillHandler,
  } = useForm(
    {
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
      age: {
        value: "",
        messages: [],
        isValid: true,
        isFocus: false,
      },
      gender: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
      contact: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
    },
    false
  );

  // console.log(formState);

  // Use Thunk hook for createAsyncThunk creation of students for guardian
  const [
    doCreateGuardianStudents,
    createGuardianStudentsLoading,
    createGuardianStudentsSuccess,
    createGuardianStudentsError,
  ] = useThunk(createGuardianStudents);

  const addStudentHandler = () => {
    if (!formState.formisValid) {
      toast.error("Form error. Please fill in the form again");
      return;
    }

    const newStudentProfile = {
      id: uuidv4(),
      first_name: formState.inputs.first_name.value,
      last_name: formState.inputs.last_name.value,
      age: formState.inputs.age.value,
      gender: formState.inputs.gender.value,
      contact: formState.inputs.contact.value,
      email: user.email,
    };

    setStudentList([...studentList, newStudentProfile]);
    resetFormHandler();
  };
  const editClickHandler = (id) => {
    const findStudent = studentList.find((student) => student.id === id);
    if (findStudent) {
      fillHandler(findStudent);
    }
    setIsEdit((prev) => ({ state: true, id: findStudent.id }));
  };

  const updateClickhandler = () => {
    const updatedStudentList = studentList.map((student) => {
      if (student.id === isEdit.id) {
        return {
          ...student,
          first_name: formState.inputs.first_name.value,
          last_name: formState.inputs.last_name.value,
          age: formState.inputs.age.value,
          gender: formState.inputs.gender.value,
          contact: formState.inputs.contact.value,
          email: user.email,
        };
      } else {
        return student;
      }
    });
    setStudentList(updatedStudentList);
    resetFormHandler();
    setIsEdit((prev) => ({ state: false, id: null }));
  };

  const deleteClickHandler = (studentId) => {
    const updatedStudentList = studentList.filter(
      (student) => student.id !== studentId
    );
    setStudentList(updatedStudentList);
  };

  const submitStudentsHandler = () => {
    if (studentList.length === 0) {
      toast.error("Please at least 1 student");
    }
    doCreateGuardianStudents(studentList);
  };

  useEffect(() => {
    if (createGuardianStudentsSuccess) {
      navigate("/guardians/dashboard");
    }
  }, [navigate, createGuardianStudentsSuccess]);

  const addStudentForm = (
    <div>
      <div className="text-center">
        <h1>
          <FaUser className="inline mr-3" /> Student Profile
        </h1>
        <p>Fill in profile details</p>
      </div>
      <InputV2
        id="first_name"
        type="text"
        label="First_name"
        placeholder="Enter first name"
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
        label="Last name"
        placeholder="Enter last name"
        onFocus={() => focusHandler("last_name")}
        onChange={(e) =>
          changeHandler(e, "last_name", [Validator.VALIDATOR_REQUIRE()])
        }
        value={formState.inputs.last_name.value}
        isFocus={formState.inputs.last_name.isFocus}
        isValid={formState.inputs.last_name.isValid}
        errorMessages={formState.inputs.last_name.messages}
      ></InputV2>
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
        id="contact"
        type="text"
        label="Contact"
        placeholder="Enter contact number"
        onFocus={() => focusHandler("contact")}
        onChange={(e) =>
          changeHandler(e, "contact", [Validator.VALIDATOR_REQUIRE()])
        }
        value={formState.inputs.contact.value}
        isFocus={formState.inputs.contact.isFocus}
        isValid={formState.inputs.contact.isValid}
        errorMessages={formState.inputs.contact.messages}
      ></InputV2>
      {isEdit.state ? (
        <Button primary rounded onClick={() => updateClickhandler()}>
          Edit
        </Button>
      ) : (
        <Button primary rounded onClick={() => addStudentHandler()}>
          Add Student
        </Button>
      )}
    </div>
  );

  const studentListContent = studentList.map((student, i) => {
    return (
      <div>
        <h1 className="mb-3" key={i}>
          {i + 1}) {student.first_name}
        </h1>
        <div className="flex">
          <Button
            classNames="mr-3"
            rounded
            primary
            onClick={() => editClickHandler(student.id)}
          >
            Edit
          </Button>
          <Button
            secondary
            rounded
            onClick={() => deleteClickHandler(student.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  });

  return (
    <div>
      {addStudentForm}
      {studentListContent.length !== 0 && studentListContent}
      {studentListContent.length !== 0 && (
        <Button classNames="mt-3" onClick={submitStudentsHandler}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default GuardianCreateStudents;
