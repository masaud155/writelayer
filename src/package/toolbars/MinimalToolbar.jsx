import React from "react";
import { Bold, Italic, Link, Smile, Underline } from "lucide-react";
import { EmojiPicker } from "../controls/EmojiPicker.jsx";
import { LinkDialog } from "../controls/LinkDialog.jsx";
import { ToolbarButton } from "./ToolbarButton.jsx";
import { ToolbarGroup } from "./ToolbarGroup.jsx";

export function MinimalToolbar({ editor, commands }) {
  if (!editor) return null;
  return (
    <div className="novatext-toolbar">
      <ToolbarGroup>
        <ToolbarButton icon={Bold} label="Bold" active={editor.isActive("bold")} onClick={commands.toggleBold} />
        <ToolbarButton icon={Italic} label="Italic" active={editor.isActive("italic")} onClick={commands.toggleItalic} />
        <ToolbarButton icon={Underline} label="Underline" active={editor.isActive("underline")} onClick={commands.toggleUnderline} />
        <LinkDialog editor={editor} onSetLink={commands.setLink} onUnsetLink={commands.unsetLink} triggerIcon={Link} />
        <EmojiPicker editor={editor} triggerIcon={Smile} />
      </ToolbarGroup>
    </div>
  );
}
