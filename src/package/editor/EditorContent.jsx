import React from "react";
import { EditorContent as TiptapEditorContent } from "@tiptap/react";
import { cn } from "../utils/styleUtils.js";

export function EditorContent({ editor, className, minHeight, maxHeight, height }) {
  return (
    <div
      className={cn("novatext-content", className)}
      style={{
        minHeight,
        maxHeight,
        height,
      }}
    >
      <TiptapEditorContent editor={editor} />
    </div>
  );
}
