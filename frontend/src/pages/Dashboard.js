import React, { useEffect } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInstructorClass, reset } from "../features/class/classSlice";

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
    classDispatch(getInstructorClass());
  }, [classDispatch]);

  const content = classes.map((singleClass,i) => <div key={i}>{singleClass.title}</div> );


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
