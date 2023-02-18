import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { sendRequestToJoinClass } from "../../features/class/classSlice";
import useThunk from "../../hooks/useThunkHook";
import Modal from "../../components/Shared/Modal";
import { toast } from "react-toastify";
import SelectV2 from "../../components/SelectV2";
import useForm from "../../hooks/useFormHook";
import Validator from "../../utilities/Validator";

const ClassInvite = () => {
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);
  const [isModalOpen, setIsModalIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  let { classId } = useParams();

  const { formState, changeHandler, focusHandler } = useForm(
    {
      student: {
        value: "",
        messages: [],
        isValid: false,
        isFocus: false,
      },
    },
    false
  );

  console.log(formState);

  console.log("check profile",user.profiles);
  // Get Names array
  const studentNames = user.profiles.map((student) => ({
    display: student.first_name,
    value: student._id,
  }));

  console.log(studentNames);

  // Use Thunk hook for createAsyncThunk
  const [
    doSendRequestToJoin,
    sendRequestToJoinLoading,
    sendRequestToJoinSuccess,
    sendRequestToJoinError,
  ] = useThunk(sendRequestToJoinClass);

  const joinClassHandler = () => {
    if (user.role !== "student" && user.role !== "guardian") {
      toast.error("You need to be a student or guardian to join a class");
      return;
    }
    setIsModalIsOpen(true);
  };

  const joinSubmitHandler = () => {
    const studentClassData = {
      classId,
      studentId: formState.inputs.student.value,
    };

    console.log("Join", studentClassData)
    doSendRequestToJoin(studentClassData);
    setIsModalIsOpen(false);
  };

  useEffect(() => {
    if (sendRequestToJoinSuccess) {
      setIsSent(true);
    }
  }, [sendRequestToJoinSuccess]);

  return (
    <div>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalIsOpen(false)}>
        <h1>Are you sure you want to join class?</h1>
        <Button primary rounded outline onClick={() => setIsModalIsOpen(false)}>
          Cancel
        </Button>
        <Button primary rounded onClick={joinSubmitHandler}>
          Confirm
        </Button>
      </Modal>

      <SelectV2
        id="student"
        label="Student"
        options={studentNames}
        onChange={(e) =>
          changeHandler(e, "student", [Validator.VALIDATOR_REQUIRE()])
        }
        onFocus={() => focusHandler("student")}
        isFocus={formState.inputs.student.isFocus}
        isValid={formState.inputs.student.isValid}
        errorMessages={formState.inputs.student.messages}
      ></SelectV2>
      <Button onClick={joinClassHandler}>Join Class</Button>
      <Button onClick={() => navigate("/")}>Back to home</Button>
      {isSent && <div>Request to join class sent!</div>}
    </div>
  );
};

export default ClassInvite;
