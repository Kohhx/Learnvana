import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Classdisplay = ({classData, role }) => {
  const { _id, title, instructor_name } = classData;
  const {studentId }= useParams();
  return (
    <>
      <div className="
        col-span-4 mb-3 pl-5 py-3 rounded-l-2xl
        font-semibold text-proj-blue4-200
       bg-proj-white3-200 border-t border-b border-l border-proj-grey2-200"
       ><Link to={`/students/${studentId}/classes/${_id}`}>{title}</Link>
       </div>
      <div className="
        col-span-3 mb-3 py-3 border-t border-b
       bg-proj-white3-200 border-proj-grey2-200"
       >{instructor_name}
       </div>
      <div className="
        col-span-3 mb-3 py-3 border-t border-b
        bg-proj-white3-200 border-proj-grey2-200"
        >date
      </div>
      <div className="
        col-span-3 mb-3 py-3 border-t border-b
        bg-proj-white3-200 border-proj-grey2-200"
        >2 date
      </div>
      <div className="
        col-span-1 mb-3 py-3 border-t border-b border-r rounded-r-2xl
        bg-proj-white3-200 border-proj-grey2-200"
        >drop
      </div>
      <div className="col-span-1 mb-3 py-3"></div>
      <div className="
        col-span-1 mb-3 py-3 border rounded-2xl text-center
        bg-proj-white3-200 border-proj-grey2-200"
        >6/6
      </div>

    </>

  );
};

export default Classdisplay;
