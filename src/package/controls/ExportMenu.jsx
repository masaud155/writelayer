import React, { useState } from "react";
import { Download } from "lucide-react";
import { ToolbarButton } from "../toolbars/ToolbarButton.jsx";
import { exportContent } from "../utils/exportUtils.js";

const FORMATS = ["html", "markdown", "json", "text"];

export function ExportMenu({ editor, outputFormat = "html" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState("");

  const copy = async (format) => {
    const output = exportContent(editor, format);
    const text = typeof output === "string" ? output : JSON.stringify(output, null, 2);
    await navigator.clipboard?.writeText(text);
    setCopied(format);
    setOpen(false);
  };

  return (
    <div className="relative">
      <ToolbarButton icon={Download} label="Export" onClick={() => setOpen((value) => !value)} />
      {open ? (
        <div className="novatext-popover absolute right-0 top-10 w-44">
          {FORMATS.map((format) => (
            <button key={format} type="button" className="novatext-button w-full justify-start" onClick={() => copy(format)}>
              {format === outputFormat ? "Current: " : ""}{format.toUpperCase()}
            </button>
          ))}
        </div>
      ) : null}
      {copied ? <span className="absolute right-0 top-12 text-xs text-slate-500">Copied {copied}</span> : null}
    </div>
  );
}
