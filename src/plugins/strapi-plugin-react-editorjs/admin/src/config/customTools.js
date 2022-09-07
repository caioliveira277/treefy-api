import PluginId from "../pluginId";

import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import ColorPlugin from "editorjs-text-color-plugin";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
import LinkTool from "@editorjs/link";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
// import CheckList from "@editorjs/checklist";
// import Warning from '@editorjs/warning'
// import Code from '@editorjs/code'
// import Raw from '@editorjs/raw'
// import Quote from "@editorjs/quote";

const customTools = {
  embed: Embed,
  align: {
    class: AlignmentTuneTool,
    config: {
      default: "left",
    },
  },
  table: {
    class: Table,
    inlineToolbar: true,
    tunes: ["align"],
  },
  list: {
    class: List,
    inlineToolbar: true,
    tunes: ["align"],
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
    tunes: ["align"],
  },
  Color: {
    class: ColorPlugin,
    config: {
      colorCollections: [
        "#4ABC86",
        "#585960",
        "#253239",
        "#C6C6C6",
        "#EEEEEE",
        "#01A0C4",
        "#B0D8FE",
        "#FEF3A7",
        "#C46403",
        "#79AA05",
        "#E04244",
      ],
      defaultColor: "#585960",
      type: "text",
    },
  },
  delimiter: Delimiter,
  inlineCode: InlineCode,
};

export default customTools;
