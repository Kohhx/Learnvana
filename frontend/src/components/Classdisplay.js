import React, { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Classhide from "./Classhide";
import Lessondisplay from "./Lessondisplay";
import useThunk from "../hooks/useThunkHook";
import { getClassLessons } from "../features/instructor/instructorSlice";

const Classdisplay = ({classData, role }) => {
  const { _id, title, instructor_name, lessons } = classData;
  const { studentId }= useParams();

  let {classId} = {classId: _id}

  // React state to manage visibility
  const [show, setShow] = useState();


  // function to toggle the boolean value
  function toggleShow() {
    setShow(!show);
  };

  // get all class lessons
  const [
    doGetClassLessons,
    getLessonsLoading,
    getLessonsSuccess,
    getLessonsError,
  ] = useThunk(getClassLessons);


  useEffect(() => {
    doGetClassLessons(classId);
  }, [doGetClassLessons, show]);


  // display all lessons
  const allLessons = lessons.map((singleLesson, i) => (
    <Lessondisplay key={i} lessonData={singleLesson} classId={classId} role="instructor" />
  ));


  // check if lessons exist, if lessons exist icon appear
  function displayIcon() {
    if (allLessons.length === 0) {
      return (<></>)
    } else {
      return (<><RiArrowDropDownLine onClick={toggleShow} className="text-2xl hover:opacity-30" /></>)
    }
  }


  return (
    <>
      <div className="
        col-span-4 mt-3 pl-5 py-3 rounded-l-2xl z-10
        font-semibold text-proj-blue4-200 hover:text-opacity-70
       bg-proj-white3-200 border-t border-b border-l border-proj-grey2-200"
       ><Link to={`/students/${studentId}/classes/${_id}`}>{title}</Link>
       </div>
      <div className="
        col-span-3 mt-3 py-3 border-t border-b z-10
        text-proj-grey3-300
       bg-proj-white3-200 border-proj-grey2-200"
       >{instructor_name}
       </div>
      <div className="
        col-span-3 mt-3 py-3 border-t border-b z-10
        text-proj-grey3-300
        bg-proj-white3-200 border-proj-grey2-200"
        >date
      </div>
      <div className="
        col-span-3 mt-3 py-3 border-t border-b z-10
        text-proj-grey3-300
        bg-proj-white3-200 border-proj-grey2-200"
        >2 date
      </div>
      <div className="
        col-span-1 mt-3 py-3 border-t border-b border-r rounded-r-2xl z-10
        text-end text-proj-grey3-300
        bg-proj-white3-200 border-proj-grey2-200"
        >
          <div className="flex justify-end pr-5">
            {displayIcon()}
          </div>
      </div>
      <div className="col-span-1 mt-3 py-3 z-10 text-proj-grey3-300"></div>
      <div className="
        col-span-1 mt-3 py-3 border rounded-2xl z-10
        text-center text-proj-grey3-300
        bg-proj-white3-200 border-proj-grey2-200"
        >6/6
      </div>

      {/* insertion of rows lessons data */ }
      {show && allLessons}
    </>

  );
};

export default Classdisplay;
