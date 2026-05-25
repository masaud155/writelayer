import React, { useState } from "react";
import { Smile } from "lucide-react";
import { ToolbarButton } from "../toolbars/ToolbarButton.jsx";

const EMOJIS = ["👍", "✨", "🔥", "✅", "💡", "❤️", "🚀", "👏"];

export function EmojiPicker({ editor, triggerIcon = Smile }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <ToolbarButton icon={triggerIcon} label="Emoji" onClick={() => setOpen((value) => !value)} />
      {open ? (
        <div className="novatext-popover absolute left-0 top-10 grid grid-cols-4 gap-1">
          {EMOJIS.map((emoji) => (
            <button key={emoji} type="button" className="novatext-button text-base" onClick={() => { editor?.chain().focus().insertContent(emoji).run(); setOpen(false); }}>
              {emoji}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
