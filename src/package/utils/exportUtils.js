import { htmlToMarkdown } from "./markdownUtils.js";

export function getOutputFromEditor(editor, outputFormat = "html") {
  if (!editor) return outputFormat === "json" ? null : "";
  if (outputFormat === "json") return editor.getJSON();
  if (outputFormat === "markdown") return htmlToMarkdown(editor.getHTML());
  if (outputFormat === "text") return editor.getText();
  return editor.getHTML();
}

export function exportContent(editor, format = "html") {
  return getOutputFromEditor(editor, format);
}
