import React, { useMemo, useState } from "react";
import { CheckCircle2, Code2, Copy, PanelsTopLeft, SlidersHorizontal } from "lucide-react";
import { NovaTextEditor } from "../../package/index.js";

export function PlaygroundPage() {
  const [content, setContent] = useState("<h2>Build richer content fields</h2><p>NovaText gives teams a polished editor without building a writing app.</p>");
  const [preset, setPreset] = useState("blog");
  const [theme, setTheme] = useState("default");
  const [toolbarMode, setToolbarMode] = useState("classic");
  const [outputFormat, setOutputFormat] = useState("html");

  const usage = useMemo(
    () => `import { NovaTextEditor } from "@novatext/react-editor";
import "@novatext/react-editor/styles.css";

<NovaTextEditor
  value={content}
  onChange={setContent}
  preset="${preset}"
  theme="${theme}"
  toolbarMode="${toolbarMode}"
  outputFormat="${outputFormat}"
/>`,
    [outputFormat, preset, theme, toolbarMode],
  );

  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-5 py-6 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontal size={17} />
            <h2 className="text-sm font-bold">Editor configuration</h2>
          </div>
          <div className="grid gap-3">
            <Control label="Preset" value={preset} onChange={setPreset} options={["blog", "comment", "cms", "email", "docs", "minimal"]} />
            <Control label="Theme" value={theme} onChange={setTheme} options={["default", "minimal", "docs", "notion", "medium", "glass", "dark", "compact"]} />
            <Control label="Toolbar" value={toolbarMode} onChange={setToolbarMode} options={["classic", "minimal", "floating"]} />
            <Control label="Output" value={outputFormat} onChange={setOutputFormat} options={["html", "markdown", "json", "text"]} />
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-950 p-4 text-slate-100 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Code2 size={16} /> Usage
            </div>
            <button type="button" className="flex h-8 items-center gap-2 rounded-md bg-white/10 px-2 text-xs font-semibold text-white hover:bg-white/15" onClick={() => navigator.clipboard?.writeText(usage)}>
              <Copy size={13} /> Copy
            </button>
          </div>
          <pre className="max-h-80 overflow-auto whitespace-pre-wrap text-xs leading-5 text-slate-300">{usage}</pre>
        </div>
      </aside>
      <div className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          <div className="mb-3 flex flex-col gap-3 px-1 pt-1 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <PanelsTopLeft size={18} />
              <div>
                <h2 className="text-sm font-bold">Live editor surface</h2>
                <p className="text-xs text-slate-500">Switch presets and output formats without leaving the form context.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              <CheckCircle2 size={14} /> Controlled component
            </div>
          </div>
          <NovaTextEditor
            value={content}
            onChange={setContent}
            preset={preset}
            theme={theme}
            toolbarMode={toolbarMode}
            outputFormat={outputFormat}
            placeholder="Write something useful..."
            minHeight={380}
            validation={{ maxWords: 2000, requireImageAltText: false }}
          />
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold">Current output</h2>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold uppercase text-slate-600">{outputFormat}</span>
          </div>
          <pre className="max-h-64 overflow-auto rounded-md bg-[#f8fafc] p-3 whitespace-pre-wrap text-xs leading-5 text-slate-600">{typeof content === "string" ? content : JSON.stringify(content, null, 2)}</pre>
        </div>
      </div>
    </section>
  );
}

function Control({ label, value, onChange, options }) {
  return (
    <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
      {label}
      <select className="mt-2 h-10 w-full rounded-md border border-slate-200 bg-[#fbfcfe] px-3 text-sm font-semibold normal-case tracking-normal text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
