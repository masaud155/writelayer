import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextAlign from "@tiptap/extension-text-align";
import { Callout } from "./calloutExtension.js";
import { NovaImage } from "./imageExtension.js";
import { NovaTable, NovaTableCell, NovaTableHeader, NovaTableRow } from "./tableExtensions.js";
import { createPlaceholderExtension } from "./placeholderExtension.js";

export function createEditorExtensions({ placeholder, extensions = [], plugins = [] } = {}) {
  const pluginExtensions = plugins.flatMap((plugin) => plugin.extensions || []);
  return [
    StarterKit.configure({
      heading: { levels: [1, 2, 3, 4, 5, 6] },
      codeBlock: {
        HTMLAttributes: { class: "novatext-code-block" },
      },
    }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      linkOnPaste: true,
    }),
    Underline,
    TextStyle,
    Color,
    Highlight.configure({ multicolor: true }),
    Superscript,
    Subscript,
    TaskList,
    TaskItem.configure({ nested: true }),
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    NovaImage,
    NovaTable,
    NovaTableRow,
    NovaTableHeader,
    NovaTableCell,
    Callout,
    createPlaceholderExtension(placeholder),
    ...pluginExtensions,
    ...extensions,
  ];
}
