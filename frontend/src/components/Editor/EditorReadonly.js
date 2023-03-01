import React, { useState, useEffect, useRef } from "react";
import EditorJs from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../../config/EditorTools";
import uuid from 'react-uuid';

const EditorReadonly = ({ data }) => {
  const uuidNo = uuid();
  // const [editorData, setEditorData] = useState(data);
  const ejInstance = useRef();

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current.destroy();
      ejInstance.current = null;
    };
  }, [data]);

  const initEditor = () => {
    const editor = new EditorJs({
      holder: uuidNo,
      logLevel: "ERROR",
      data: typeof data === "string" ? JSON.parse(data) : data,
      onReady: () => {
        ejInstance.current = editor;
      },
      readOnly: true,
      autofocus: true,
      tools: EDITOR_JS_TOOLS,
    });
  };

  return (
    <>
      <div id={uuidNo}></div>
    </>
  );
};

export default EditorReadonly;
