import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Lessonitem from "../../components/Lessonitem";
import { useSelector, useDispatch } from "react-redux";
import { getClassLessons } from "../../features/student/studentSlice";
import useThunk from "../../hooks/useThunkHook";

const StudentLessons = () => {
  let { classId } = useParams();
  const { classLessons } = useSelector((state) => state.student);
  const { user } = useSelector((state) => state.auth);
  const role = user.role;

  const [
    doGetClassLessons,
    getLessonsLoading,
    getLessonsSuccess,
    getLessonsError,
  ] = useThunk(getClassLessons);

  useEffect(() => {
    doGetClassLessons(classId);
  }, [doGetClassLessons, classId]);

  const allLessons = classLessons.map((singleLesson, i) => (
    <Lessonitem
      key={i}
      lessonData={singleLesson}
      role="student"
      classId={classId}
    />
  ));

  return <div>{allLessons}</div>;
};

export default StudentLessons;
