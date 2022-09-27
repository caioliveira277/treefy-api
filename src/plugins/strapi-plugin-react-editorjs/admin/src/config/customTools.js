import PluginId from "../pluginId";

// import Embed from "@editorjs/embed";
// import Table from "@editorjs/table";
import List from "@editorjs/list";
// import ColorPlugin from "editorjs-text-color-plugin";
// import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
import LinkTool from "@editorjs/link";
import Header from "@editorjs/header";
// import Delimiter from "@editorjs/delimiter";
// import InlineCode from "@editorjs/inline-code";
// import CheckList from "@editorjs/checklist";
// import Warning from '@editorjs/warning'
// import Code from '@editorjs/code'
// import Raw from "@editorjs/raw";
// import Quote from "@editorjs/quote";

const customTools = {
  list: {
    class: List,
    inlineToolbar: true,
  },
  LinkTool: {
    class: LinkTool,
    config: {
      endpoint: `/api/${PluginId}/link`,
    },
  },
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      levels: [2, 3],
      defaultLevel: 2,
    },
  },
};

export default customTools;
