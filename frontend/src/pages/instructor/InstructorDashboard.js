import React, { useEffect } from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInstructorClasses, reset } from "../../features/instructor/instructorSlice";
import Classitem from "../../components/Classitem"
import useThunk from "../../hooks/useThunkHook";

const InstructorDashboard = () => {
  const { instructorClasses } = useSelector((state) => state.instructor);

  const [
    doGetInstructorClasses,
    getInstructorLoading,
    getInstructorSuccess,
    getInstructorError,
  ] = useThunk(getInstructorClasses);


  // useEffect(() => {
  //   return () => {
  //     if (isSuccess) {
  //       classDispatch(reset());
  //     }
  //   };
  // }, [isSuccess,classDispatch]);

  useEffect(() => {
    doGetInstructorClasses();
  }, [doGetInstructorClasses]);

  const content = instructorClasses.map((singleClass,i) => <Classitem key={i} classData={singleClass}/> );


  return (
    <div>
      <p>dashboard</p>
      {content}
    </div>
  );
};

export default InstructorDashboard;
