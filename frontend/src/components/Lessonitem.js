import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "./Button";
import { deleteClassLesson } from "../features/instructor/instructorSlice";
import useThunk from "../hooks/useThunkHook";

const Lessonitem = ({ lessonData, role, classId }) => {
  const { title, _id } = lessonData;
  const { studentId } = useParams();

  // delete class lesson
  const [
    doDeleteClassLesson,
    deleteLessonLoading,
    deleteLessonSuccess,
    deleteLessonError,
  ] = useThunk(deleteClassLesson);

  // Remove Student Handler
  const removeLessonHandler = (classId, lessonId) => {
    const dataIn = {
      classId,
      lessonId,
      action: "deleteLesson",
    };
    console.log(_id);
    console.log("lessonITEM", lessonId);
    doDeleteClassLesson(dataIn);
  };

  useEffect(() => {
    if (deleteLessonSuccess) {
      console.log("successfully removed lesson");
    }
  }, [deleteLessonSuccess]);

  return (
    <div>
      <div className="inline-block">
        <Link to={`/students/${studentId}/classes/${classId}/lessons/${_id}`}>
          {title}
        </Link>
      </div>

      {role === "instructor" && (
        <div className="inline-block pl-10">
          <Button
            danger
            rounded
            onClick={() => removeLessonHandler(classId, _id)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Lessonitem;
