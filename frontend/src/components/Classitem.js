import React from "react";
import { Link } from "react-router-dom";

const Classitem = ({ classData }) => {
  const { title, _id } = classData;

  return (
    <div>
      <Link to={`/classes/${_id}`}>{title}</Link>
    </div>
  );
};

export default Classitem;
