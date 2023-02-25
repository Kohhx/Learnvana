import React, { useState } from "react";
import Editor from "../components/Editor/Editor";
import EditorReadonly from "../components/Editor/EditorReadonly";
import useForm from "../hooks/useFormHook";
import Button from "../components/Button";

const Home = () => {
  const [toggle, setToggle] = useState(false);
  const [prevData, setPrevData] = useState(null)

  const { formState, editorChangeHandler } = useForm(
    {
      lesson: {
        value: [],
        messages: [],
        isValid: false,
        isFocus: false,
      },
    },
    false
  );

  // console.log("Form", formState.inputs.lesson.value);

  return (
    <div>
      <Button onClick={() => setToggle(!toggle)}>Toggle</Button>
      {toggle ? <h1>Read Only Mode</h1> : <h1>Edit Mode</h1>}
      <div className="w-3/5 mx-auto">
        {toggle ? (
          <EditorReadonly data={formState.inputs.lesson.value} />
        ) : (
          <Editor
            id="lesson"
            onChange={editorChangeHandler}
            data={formState.inputs.lesson.value}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
