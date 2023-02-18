import React from "react";
import { Link } from "react-router-dom";

const Classitem = ({ classData, role }) => {
  const { title, _id } = classData;
  return (
    <div>
      <Link to={`/${role}s/classes/${_id}`}>{title}</Link>
    </div>
  );
};

export default Classitem;
