
import React, { useEffect } from 'react'
import { useParams, NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { reset, getInstructorClass } from "../features/instructor/instructorSlice"
import Button from "../components/Button";
import useThunk from '../hooks/useThunkHook';
import Hamburger from "../components/Shared/Hamburger";
import { CSSTransition } from "react-transition-group";
import "../components/Shared/Hamburger.css";

const InstructorClass = () => {
  const [isOpen, setIsOpen] = useState(false);
  let { classId } = useParams();

  const { instructorClass } = useSelector((state) => state.instructor);

  const [
    doGetInstructorClasses,
    getInstructorLoading,
    getInstructorSuccess,
    getInstructorError,
  ] = useThunk(getInstructorClass);

  // useEffect(() => {
  //   return () => {
  //     if (isSuccess) {
  //       classDispatch(reset());
  //     }
  //   };
  // }, [isSuccess,classDispatch]);

  useEffect(() => {
    doGetInstructorClasses(classId);
  }, [doGetInstructorClasses, classId]);

  return (
    <div>
      <div className="flex">
        <CSSTransition
          in={isOpen}
          timeout={200}
          classNames="fade"
          unmountOnExit
        >
          <div className="h-screen w-[13%] bg-orange-400"></div>
        </CSSTransition>
        <div>
          <Hamburger
            classNames="m-2"
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
          {instructorClass.title}
          <Button primary rounded><NavLink to={`/instructors/classes/${classId}/lessons`}>Create Lesson</NavLink></Button>
        </div>
      </div>
    </div>
  );
};

export default InstructorClass;
