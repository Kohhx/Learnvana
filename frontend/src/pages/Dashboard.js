import React, { useEffect } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInstructorClasses, reset } from "../features/class/classSlice";
import Classitem from "../components/Classitem"

const Dashboard = () => {
  const classDispatch = useDispatch();
  const { classes, isSuccess, isLoading } = useSelector((state) => state.class);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        classDispatch(reset());
      }
    };
  }, [isSuccess,classDispatch]);

  useEffect(() => {
    classDispatch(getInstructorClasses());
  }, [classDispatch]);

  const content = classes.map((singleClass,i) => <Classitem key={i} classData={singleClass}/> );


  return (
    <div>
      <p>dashboard</p>
      {content}
      {/* <Button secondary rounded><Link to="/classes/new">New class</Link></Button>
       */}
    </div>
  );
};

export default Dashboard;
