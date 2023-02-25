// import Embed from "@editorjs/embed";
// import Table from "@editorjs/table";
import List from "@editorjs/list";
// import Warning from "@editorjs/warning";
// import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import RawTool from "@editorjs/raw";
import Header from "@editorjs/header";
// import Quote from "@editorjs/quote";
// import Marker from "@editorjs/marker";
// import CheckList from "@editorjs/checklist";
// import Delimiter from "@editorjs/delimiter";
// import InlineCode from "@editorjs/inline-code";
// import SimpleImage from "@editorjs/simple-image";
import { axiosInstance } from "./axios";
import formatUtil from "../utilities/FormatUtil";

export const EDITOR_JS_TOOLS = {
  header: {
    class: Header,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  linkTool: {
    class: LinkTool,
  },
  raw: RawTool,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
        async uploadByFile(file) {
          return uploadPhotoBackend(file);
        },
      },
    },
  },
};

// Helper function

// Upload photo to backend
const uploadPhotoBackend = async (file) => {
  const URL = `utilities/uploadphoto`;

  const newFileFD = formatUtil.convertObjToFormData({
    picture: file,
  });

  const { token } = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
console.log("WHY")
  const response = await axiosInstance.post(URL, newFileFD, config);
  if (response.data) {
    return response.data;
  }
};
