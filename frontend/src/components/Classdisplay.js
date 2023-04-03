import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Classdisplay = ({classData, role }) => {
  const { title, _id } = classData;
  const {studentId }= useParams();
  return (
    <>
      <div className="
        col-span-4 mb-2 rounded-l
       bg-proj-white3-200 border-t border-b border-l border-proj-grey2-200"
       ><Link to={`/students/${studentId}/classes/${_id}`}>{title}</Link>
       </div>
      <div className="
        col-span-2 mb-2 border-t border-b
       bg-proj-white3-200 border-proj-grey2-200"
       >asdas
       </div>
      <div className="
        col-span-2 mb-2 border-t border-b
        bg-proj-white3-200 border-proj-grey2-200"
        >date
      </div>
      <div className="
        col-span-2 mb-2 border-t border-b border-r rounded-r
        bg-proj-white3-200 border-proj-grey2-200"
        >2 date
      </div>
      <div className="col-span-1 mb-2"></div>
      <div className="
        col-span-1 mb-2 border rounded
        bg-proj-white3-200 border-proj-grey2-200"
        >2 date
      </div>

    </>

  );
};

export default Classdisplay;
