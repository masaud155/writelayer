import React, { useEffect, useRef, useState } from "react";
import { Check, Palette, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ToolbarButton } from "../toolbars/ToolbarButton.jsx";

const COLORS = ["#111827", "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#2563eb", "#7c3aed", "#db2777", "#f8fafc"];

export function ColorPicker({ label = "Color", icon: Icon = Palette, onSelect, onClear }) {
  const [open, setOpen] = useState(false);
  const [customColor, setCustomColor] = useState("#2563eb");
  const [recent, setRecent] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const selectColor = (color) => {
    onSelect?.(color);
    setRecent((items) => [color, ...items.filter((item) => item !== color)].slice(0, 6));
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <ToolbarButton icon={Icon} label={label} onClick={() => setOpen((value) => !value)} />
      <AnimatePresence>
        {open ? (
          <motion.div className="novatext-popover absolute left-0 top-10" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
            <div className="mb-2 text-xs font-semibold text-slate-500">{label}</div>
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map((color) => (
                <button key={color} type="button" className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200" style={{ backgroundColor: color }} onClick={() => selectColor(color)} aria-label={`Use ${color}`}>
                  {color === customColor ? <Check size={14} /> : null}
                </button>
              ))}
            </div>
            {recent.length ? (
              <div className="mt-3 grid grid-cols-6 gap-2">
                {recent.map((color) => (
                  <button key={color} type="button" className="h-6 w-6 rounded-full border border-slate-200" style={{ backgroundColor: color }} onClick={() => selectColor(color)} aria-label={`Reuse ${color}`} />
                ))}
              </div>
            ) : null}
            <div className="mt-3 flex items-center gap-2">
              <input className="h-8 w-10 cursor-pointer rounded border" type="color" value={customColor} onChange={(event) => setCustomColor(event.target.value)} aria-label="Custom color" />
              <button type="button" className="novatext-button" onClick={() => selectColor(customColor)}>
                Apply
              </button>
              <button type="button" className="novatext-button" onClick={() => { onClear?.(); setOpen(false); }}>
                <X size={14} /> None
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
