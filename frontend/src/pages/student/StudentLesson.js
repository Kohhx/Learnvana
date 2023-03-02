import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getClassLesson } from "../../features/student/studentSlice";
import useThunk from "../../hooks/useThunkHook";

const StudentLesson = () => {
  const ids = useParams();
  const { classLesson } = useSelector((state) => state.student);

  const [dogetClassLesson, getLessonLoading, getLessonSuccess, getLessonError] =
    useThunk(getClassLesson);

  useEffect(() => {
    dogetClassLesson(ids);
  }, [dogetClassLesson, ids]);

  return (
    <div>
      <p>{classLesson.title}</p>
      <p>sssssssss</p>
    </div>
  );
};

export default StudentLesson;
