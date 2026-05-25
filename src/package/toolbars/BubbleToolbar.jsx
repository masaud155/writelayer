import React from "react";
import { BubbleMenu } from "@tiptap/react";
import { Bold, Code, Eraser, Italic, Link, Underline } from "lucide-react";
import { ColorPicker } from "../controls/ColorPicker.jsx";
import { LinkDialog } from "../controls/LinkDialog.jsx";
import { ToolbarButton } from "./ToolbarButton.jsx";

export function BubbleToolbar({ editor, commands }) {
  if (!editor) return null;
  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 120 }}>
      <div className="novatext-bubble">
        <ToolbarButton icon={Bold} label="Bold" active={editor.isActive("bold")} onClick={commands.toggleBold} />
        <ToolbarButton icon={Italic} label="Italic" active={editor.isActive("italic")} onClick={commands.toggleItalic} />
        <ToolbarButton icon={Underline} label="Underline" active={editor.isActive("underline")} onClick={commands.toggleUnderline} />
        <ToolbarButton icon={Code} label="Inline code" active={editor.isActive("code")} onClick={commands.toggleCode} />
        <LinkDialog editor={editor} onSetLink={commands.setLink} onUnsetLink={commands.unsetLink} triggerIcon={Link} />
        <ColorPicker label="Text color" onSelect={commands.setColor} onClear={commands.unsetColor} />
        <ToolbarButton icon={Eraser} label="Clear formatting" onClick={commands.clearFormatting} />
      </div>
    </BubbleMenu>
  );
}
