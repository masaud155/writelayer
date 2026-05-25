import React, { useEffect, useRef, useState } from "react";
import { Link, Unlink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ToolbarButton } from "../toolbars/ToolbarButton.jsx";

export function LinkDialog({ editor, onSetLink, onUnsetLink, triggerIcon = Link }) {
  const [open, setOpen] = useState(false);
  const [href, setHref] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const save = () => {
    if (href.trim()) onSetLink?.(href.trim());
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <ToolbarButton icon={triggerIcon} label="Link" active={editor?.isActive("link")} onClick={() => { setHref(editor?.getAttributes("link").href || ""); setOpen((value) => !value); }} />
      <AnimatePresence>
        {open ? (
          <motion.div className="novatext-popover absolute left-0 top-10 w-72" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
            <label className="text-xs font-semibold text-slate-500" htmlFor="novatext-link-url">URL</label>
            <input id="novatext-link-url" className="mt-1 h-9 w-full rounded-md border border-slate-200 px-3 text-sm" value={href} onChange={(event) => setHref(event.target.value)} placeholder="https://example.com" />
            <div className="mt-3 flex justify-end gap-2">
              <button type="button" className="novatext-button" onClick={() => { onUnsetLink?.(); setOpen(false); }}>
                <Unlink size={14} /> Remove
              </button>
              <button type="button" className="novatext-button" onClick={save}>Apply</button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
