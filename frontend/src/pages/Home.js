import React, { useState, useEffect, useRef } from "react";
import Editor from "../components/Editor/Editor";
import EditorReadonly from "../components/Editor/EditorReadonly";
import useForm from "../hooks/useFormHook";
import Button from "../components/Button";

const Home = () => {
  return (
    <div>
      <div className="h-screen proj-bg-blue-200"></div>
      <div className="h-screen proj-bg-grey-100"></div>
      <div className="h-screen proj-bg-black-100"></div>
      <div className="h-screen proj-bg-white-100"></div>
      <div className="h-screen bg-orange-200"></div>
    </div>
  );
};

export default Home;
