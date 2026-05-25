import React, { useState } from "react";
import { Columns3, Rows3, Table, Trash2 } from "lucide-react";
import { ToolbarButton } from "../toolbars/ToolbarButton.jsx";

export function TableControls({ editor, onInsert, triggerIcon = Table }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <ToolbarButton icon={triggerIcon} label="Table" onClick={() => setOpen((value) => !value)} />
      {open ? (
        <div className="novatext-popover absolute left-0 top-10 grid w-56 grid-cols-2 gap-2">
          <button type="button" className="novatext-button justify-start" onClick={() => { onInsert?.(); setOpen(false); }}>Insert</button>
          <button type="button" className="novatext-button justify-start" onClick={() => editor?.chain().focus().toggleHeaderRow().run()}>Header row</button>
          <button type="button" className="novatext-button justify-start" onClick={() => editor?.chain().focus().addRowAfter().run()}><Rows3 size={14} /> Row</button>
          <button type="button" className="novatext-button justify-start" onClick={() => editor?.chain().focus().addColumnAfter().run()}><Columns3 size={14} /> Column</button>
          <button type="button" className="novatext-button justify-start" onClick={() => editor?.chain().focus().deleteRow().run()}>Delete row</button>
          <button type="button" className="novatext-button justify-start" onClick={() => editor?.chain().focus().deleteColumn().run()}>Delete col</button>
          <button type="button" className="novatext-button col-span-2 justify-start" onClick={() => editor?.chain().focus().deleteTable().run()}><Trash2 size={14} /> Delete table</button>
        </div>
      ) : null}
    </div>
  );
}
