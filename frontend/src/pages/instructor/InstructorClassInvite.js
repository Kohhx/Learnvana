import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { sendRequestToJoinClass } from "../../features/class/classSlice";
import useThunk from "../../hooks/useThunkHook";
import Modal from "../../components/Shared/Modal";
import { toast } from "react-toastify";

const ClassInvite = () => {
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);
  const [isModalOpen, setIsModalIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  let { classId } = useParams();

  // Use Thunk hook for createAsyncThunk
  const [
    doSendRequestToJoin,
    sendRequestToJoinLoading,
    sendRequestToJoinSuccess,
    sendRequestToJoinError,
  ] = useThunk(sendRequestToJoinClass);

  const joinClassHandler = () => {
    if (user.role !== "student") {
      toast.error("You need to be a student to join a class")
      return
    }
    setIsModalIsOpen(true)
  }

  const joinSubmitHandler = () => {
    const studentClassData = {
      classId,
      studentId: user.profiles._id,
    };
    doSendRequestToJoin(studentClassData);
    setIsModalIsOpen(false)
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

      <Button onClick={joinClassHandler}>Join Class</Button>
      <Button onClick={() => navigate("/")}>Back to home</Button>
      {isSent && <div>Request to join class sent!</div>}
    </div>
  );
};

export default ClassInvite;
