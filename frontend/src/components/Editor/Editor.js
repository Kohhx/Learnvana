import React, { useEffect, useRef } from "react";
import EditorJs from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../../config/EditorTools";
import uuid from "react-uuid";
import DragDrop from "editorjs-drag-drop";

const Editor = ({ id, data, onChangeEditor }) => {
  const uuidNo = uuid();
  const ejInstance = useRef();

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJs({
      holder: uuidNo,
      logLevel: "ERROR",
      data: data,
      onReady: () => {
        new DragDrop(editor);
        ejInstance.current = editor;
      },
      onChange: async (event) => {
        let content = await editor.saver.save();
        onChangeEditor(content, id);
      },
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
