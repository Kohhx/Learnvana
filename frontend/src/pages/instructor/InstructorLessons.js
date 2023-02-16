import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NewLesson from "../../components/NewLesson";
import Hide from "../../components/Hide";
import Lessonitem from "../../components/Lessonitem";
import { useSelector, useDispatch } from "react-redux";
import {
  getClassLessons,
  reset,
} from "../../features/instructor/instructorSlice";
import useThunk from "../../hooks/useThunkHook";

const Lessons = () => {
  let { classId } = useParams();
  const { classLessons } = useSelector((state) => state.instructor);

  const [
    doGetClassLessons,
    getLessonsLoading,
    getLessonsSuccess,
    getLessonsError,
  ] = useThunk(getClassLessons);

  useEffect(() => {
    doGetClassLessons(classId);
  }, [doGetClassLessons, classId]);

  // console.log(classLessons)
  console.log(classLessons);
  const allLessons = classLessons.map((singleLesson, i) => (
    <Lessonitem key={i} lessonData={singleLesson} classId={classId} />
  ));

  return (
    <div>
      {allLessons}
      <Hide>
        <NewLesson></NewLesson>
      </Hide>
    </div>
  );
};

export default Lessons;
