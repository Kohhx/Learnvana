import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getClassLesson } from "../../features/instructor/instructorSlice";
import useThunk from "../../hooks/useThunkHook";
import EditorReadonly from "../../components/Editor/EditorReadonly";

const InstructorLesson = () => {
  const ids = useParams();
  console.log("all retreived ids", ids);
  const { classLesson } = useSelector((state) => state.instructor);

  const [dogetClassLesson, getLessonLoading, getLessonSuccess, getLessonError] =
    useThunk(getClassLesson);

  useEffect(() => {
    dogetClassLesson(ids);
  }, [dogetClassLesson, ids]);

  if (getLessonLoading) {
    return <h1>Loading...</h1>;
  }

  if (!getLessonSuccess) {
    return <h1>No lesson</h1>;
  }

  if (getLessonSuccess) {
    return (
      <div>
        <p>{classLesson.title}</p>
        <p>sssssssss</p>
        <EditorReadonly data={classLesson.content} />
      </div>
    );
  }
};

export default InstructorLesson;
