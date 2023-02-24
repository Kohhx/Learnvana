import React, { useState, useEffect, useRef } from "react";
import EditorJs from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../config/EditorTools";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import RawTool from "@editorjs/raw";
import Button from "../components/Button";
import edjsParser from "editorjs-parser";
import uuid from 'react-uuid';


// // edjsHTML tranforms editor js blocks to html
// import edjsHTML from "editorjs-html";
// // this function parses strings (html elements) to html
// import parse from "html-react-parser";

const Editor = ({ readonly, data, onChange }) => {
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
  }, []);

  const initEditor = () => {
    const editor = new EditorJs({
      holder: uuidNo,
      logLevel: "ERROR",
      data: data,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        let content = await editor.saver.save();
        onChange(content,"lesson");
        // // Put your logic here to save this data to your DB
        // setEditorData(content);
      },
      readOnly: readonly ? true : false,
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

export default Editor;
