import { useEditor } from "@tiptap/react";
import { useEffect } from "react";
import { createEditorExtensions } from "../extensions/createEditorExtensions.js";
import { getOutputFromEditor } from "../utils/exportUtils.js";
import { validateEditorContent } from "../utils/validationUtils.js";

export function useNovaEditor({
  value,
  defaultValue,
  onChange,
  onUpdate,
  onBlur,
  onFocus,
  outputFormat = "html",
  readOnly = false,
  autoFocus = false,
  placeholder,
  extensions = [],
  plugins = [],
  validation,
  onValidationChange,
} = {}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: createEditorExtensions({ placeholder, extensions, plugins }),
    content: value ?? defaultValue ?? "",
    editable: !readOnly,
    autofocus: autoFocus,
    editorProps: {
      attributes: {
        class: "novatext-prosemirror",
      },
    },
    onUpdate: ({ editor: nextEditor }) => {
      const output = getOutputFromEditor(nextEditor, outputFormat);
      onChange?.(output);
      onUpdate?.({ editor: nextEditor, output });
      if (validation && onValidationChange) {
        onValidationChange(
          validateEditorContent({
            html: nextEditor.getHTML(),
            json: nextEditor.getJSON(),
            rules: validation,
          }),
        );
      }
    },
    onBlur,
    onFocus,
  });

  useEffect(() => {
    if (!editor || value === undefined) return;
    const current = getOutputFromEditor(editor, outputFormat);
    if (current !== value) editor.commands.setContent(value || "", false);
  }, [editor, outputFormat, value]);

  useEffect(() => {
    editor?.setEditable(!readOnly);
  }, [editor, readOnly]);

  return editor;
}
