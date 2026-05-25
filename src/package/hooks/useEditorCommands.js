import { useMemo } from "react";

export function useEditorCommands(editor) {
  return useMemo(
    () => ({
      toggleBold: () => editor?.chain().focus().toggleBold().run(),
      toggleItalic: () => editor?.chain().focus().toggleItalic().run(),
      toggleUnderline: () => editor?.chain().focus().toggleUnderline().run(),
      toggleStrike: () => editor?.chain().focus().toggleStrike().run(),
      toggleCode: () => editor?.chain().focus().toggleCode().run(),
      clearFormatting: () => editor?.chain().focus().unsetAllMarks().clearNodes().run(),
      setParagraph: () => editor?.chain().focus().setParagraph().run(),
      setHeading: (level) => editor?.chain().focus().toggleHeading({ level }).run(),
      toggleBulletList: () => editor?.chain().focus().toggleBulletList().run(),
      toggleOrderedList: () => editor?.chain().focus().toggleOrderedList().run(),
      toggleTaskList: () => editor?.chain().focus().toggleTaskList().run(),
      toggleBlockquote: () => editor?.chain().focus().toggleBlockquote().run(),
      toggleCodeBlock: () => editor?.chain().focus().toggleCodeBlock().run(),
      insertDivider: () => editor?.chain().focus().setHorizontalRule().run(),
      setLink: (href) => editor?.chain().focus().extendMarkRange("link").setLink({ href }).run(),
      unsetLink: () => editor?.chain().focus().unsetLink().run(),
      setColor: (color) => editor?.chain().focus().setColor(color).run(),
      unsetColor: () => editor?.chain().focus().unsetColor().run(),
      setHighlight: (color) => editor?.chain().focus().toggleHighlight({ color }).run(),
      unsetHighlight: () => editor?.chain().focus().unsetHighlight().run(),
      insertImage: (attrs) => editor?.chain().focus().setImage(attrs).run(),
      insertTable: () => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
      insertCallout: (kind = "info") => editor?.chain().focus().setCallout(kind).run(),
    }),
    [editor],
  );
}
