import React from "react";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { sendRequestToJoinClass } from "../features/class/classSlice";
import useThunk from "../hooks/useThunkHook";

const ClassInvite = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  let { classId } = useParams();

  // Use Thunk hook for createAsyncThunk
  const [
    doSendRequestToJoin,
    sendRequestToJoinLoading,
    sendRequestToJoinSuccess,
    sendRequestToJoinError,
  ] = useThunk(sendRequestToJoinClass);

  const joinSubmitHandler = () => {
    const studentClassData = {
      classId,
      studentId: user.profiles._id,
    };
    doSendRequestToJoin(studentClassData);
  };

  return (
    <div>
      {/* Add a modal here. Use create portal */}
      <Button onClick={joinSubmitHandler}>Join Class</Button>
      <Button onClick={() => navigate("/")}>Back to home</Button>
    </div>
  );
};

export default ClassInvite;
