import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Lessondisplay = ({lessonData, role, classId }) => {
  const { _id, title, instructor_name } = lessonData;
  const { studentId }= useParams();
  return (
    <>
      <div className="
        col-span-4 mb-3 pl-5 py-3 rounded-l-2xl
        font-semibold text-proj-blue4-200 hover:text-opacity-70
       bg-proj-white3-200 border-t border-b border-l border-proj-grey2-200"
       ><Link to={`/students/${studentId}/classes/${_id}`}>{title}</Link>
       </div>
      <div className="
        col-span-3 mb-3 py-3 border-t border-b
       bg-proj-white3-200 border-proj-grey2-200"
       >sadsaasdss
       </div>
      <div className="
        col-span-3 mb-3 py-3 border-t border-b
        bg-proj-white3-200 border-proj-grey2-200"
        >dates
      </div>
      <div className="
        col-span-3 mb-3 py-3 border-t border-b
        bg-proj-white3-200 border-proj-grey2-200"
        >555s date
      </div>
      <div className="
        col-span-1 mb-3 py-3 border-t border-b border-r rounded-r-2xl
        text-end
        bg-proj-white3-200 border-proj-grey2-200"
        >sad
      </div>
      <div className="col-span-1 mb-3 py-3"></div>
      <div className="col-span-1 mb-3 py-3"></div>
    </>

  );
};

export default Lessondisplay;
