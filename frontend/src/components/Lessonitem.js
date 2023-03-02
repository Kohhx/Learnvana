import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Lessonitem = ({ lessonData, role, classId }) => {
  const { title, _id } = lessonData;
  const { studentId } = useParams();

  return (
    <div>
      <Link to={`/students/${studentId}/classes/${classId}/lessons/${_id}`}>
        {title}
      </Link>
    </div>
  );
};

export default Lessonitem;
