import React from "react";
import { Link } from "react-router-dom";

const Lessonitem = ({ lessonData, classId }) => {
  const { title, _id } = lessonData;

  return (
    <div>
      <Link to={`/instructors/classes/${classId}/lessons/${_id}`}>{title}</Link>
    </div>
  );
};

export default Lessonitem;
