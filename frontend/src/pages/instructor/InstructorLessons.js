import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NewLesson from "../../components/NewLesson";
import Hide from "../../components/Hide";
import Lessonitem from "../../components/Lessonitem";
import { useSelector } from "react-redux";
import { reset, getClassLessons, deleteClassLesson } from "../../features/instructor/instructorSlice";
import useThunk from "../../hooks/useThunkHook";

const Lessons = () => {

  let { classId } = useParams();
  const { classLessons } = useSelector((state) => state.instructor);
  const { user } = useSelector((state) => state.auth);
  const role = user.role;

  // get all class lessons
  const [
    doGetClassLessons,
    getLessonsLoading,
    getLessonsSuccess,
    getLessonsError,
  ] = useThunk(getClassLessons);


  useEffect(() => {
    doGetClassLessons(classId);
  }, [doGetClassLessons, classId]);


  // display all lessons
  const allLessons = classLessons.map((singleLesson, i) => (
    <Lessonitem key={i} lessonData={singleLesson} role={role} classId={classId} />
  ));


  return (
    <div>
      <Hide>
        <NewLesson></NewLesson>
      </Hide>
      {allLessons}

    </div>
  );
};

export default Lessons;
