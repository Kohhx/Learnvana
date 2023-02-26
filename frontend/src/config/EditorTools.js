import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
// import Warning from "@editorjs/warning";
// import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import RawTool from "@editorjs/raw";
import Quote from "@editorjs/quote";
// import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
// import Delimiter from "@editorjs/delimiter";
// import InlineCode from "@editorjs/inline-code";
import NestedList from "@editorjs/nested-list";
import Paragraph from "editorjs-paragraph-with-alignment";
import Header from "editorjs-header-with-alignment";
import ToggleBlock from "editorjs-toggle-block";
import editorjsNestedChecklist from "@calumk/editorjs-nested-checklist";
import AttachesTool from "@editorjs/attaches";
import InlineImage from 'editorjs-inline-image';
import CodeTool from "@editorjs/code";
import ChangeCase from 'editorjs-change-case';
import Tooltip from 'editorjs-tooltip';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import VideoTool from '@medistream/editorjs-video';

import { axiosInstance } from "./axios";
import formatUtil from "../utilities/FormatUtil";

export const EDITOR_JS_TOOLS = {
  header: {
    class: Header,
    inlineToolbar: true,
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author",
    },
  },
  linkTool: {
    class: LinkTool,
  },
  toggle: {
    class: ToggleBlock,
    inlineToolbar: true,
  },
  raw: RawTool,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        async uploadByFile(file) {
          return uploadFileBackend(file, "utilities/uploadimage", "image");
        },
      },
    },
  },
  urlimage: {
    class: InlineImage,
    inlineToolbar: true,
    config: {
      embed: {
        display: true,
      },
      unsplash: {
        appName: 'learnava',
        clientId: 'G0SDm1Jli0V8XrxOV9OmL1Wy61DaGv2o_q-WczeYzZc'
      }
    },
  },
  attaches: {
    class: AttachesTool,
    config: {
      uploader: {
        async uploadByFile(file) {
          return uploadFileBackend(file, "utilities/uploadfile", "file");
        },
      },
    },
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },
  nestedchecklist: editorjsNestedChecklist,
  list: {
    class: NestedList,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  embed: Embed,
  table: Table,
  code: CodeTool,
  changeCase: {
    class: ChangeCase,
    config: {
      showLocaleOption: true, // enable locale case options
      locale: 'tr' // or ['tr', 'TR', 'tr-TR']
    }
  },
  tooltip: {
    class: Tooltip,
    config: {
      location: 'left',
      highlightColor: '#FFEFD5',
      underline: true,
      backgroundColor: '#154360',
      textColor: '#FDFEFE',
      holder: 'editorId',
    }
  },
  anyTuneName: {
    class:AlignmentTuneTool,
    config:{
      default: "right",
      blocks: {
        header: 'center',
        list: 'right'
      }
    },
  },
  video: {
    class: VideoTool,
    config: {
      uploader: {
        async uploadByFile(file) {
          return uploadFileBackend(file, "utilities/uploadvideo", "video");
        },
      },
    },
  }
};

// Helper function

// Upload photo to backend
const uploadFileBackend = async (file, URL, filename) => {
  // const URL = `utilities/uploadphoto`;
  console.log("Upload File",file)

  const newFileFD = formatUtil.convertObjToFormData({
    [filename]: file,
  });

  const { token } = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axiosInstance.post(URL, newFileFD, config);
  if (response.data) {
    return response.data;
  }
};
