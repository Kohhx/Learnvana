import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Classitem = ({ classData, role }) => {
  const { title, _id } = classData;
  const {studentId }= useParams();
  return (
    <div>
      <Link to={`/students/${studentId}/classes/${_id}`}>{title}</Link>
    </div>
  );
};

export default Classitem;
