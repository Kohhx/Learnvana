import React from "react";
import { Link } from "react-router-dom";

const Lessonitem = ({ lessonData, role, classId }) => {
  const { title, _id } = lessonData;

  return (
    <div>
      <Link to={`/${role}s/classes/${classId}/lessons/${_id}`}>{title}</Link>
    </div>
  );
};

export default Lessonitem;
