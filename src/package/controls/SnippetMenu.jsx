import React, { useMemo, useState } from "react";
import { FilePlus2, Search } from "lucide-react";
import { ToolbarButton } from "../toolbars/ToolbarButton.jsx";

export function SnippetMenu({ editor, templates = [], triggerIcon = FilePlus2 }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const groupedTemplates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = templates.filter((template) => {
      const haystack = `${template.title} ${template.description} ${template.category}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
    return filtered.reduce((groups, template) => {
      const category = template.category || "Templates";
      groups[category] = [...(groups[category] || []), template];
      return groups;
    }, {});
  }, [query, templates]);

  const insertTemplate = (template) => {
    const content = typeof template.content === "function" ? template.content({ editor }) : template.content;
    editor?.chain().focus().insertContent(content || "").run();
    template.action?.({ editor });
    setOpen(false);
    setQuery("");
  };

  if (!templates.length) return null;

  return (
    <div className="relative">
      <ToolbarButton icon={triggerIcon} label="Insert template" onClick={() => setOpen((value) => !value)} />
      {open ? (
        <div className="novatext-popover novatext-template-menu absolute left-0 top-10 w-[360px]">
          <div className="mb-3 flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2">
            <Search size={14} className="text-slate-400" />
            <input
              className="h-9 min-w-0 flex-1 bg-transparent text-sm outline-none"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search templates..."
              autoFocus
            />
          </div>
          <div className="max-h-80 overflow-auto">
            {Object.entries(groupedTemplates).map(([category, items]) => (
              <div key={category} className="mb-3 last:mb-0">
                <div className="mb-1 px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{category}</div>
                <div className="grid gap-1">
                  {items.map((template) => (
                    <button key={template.id} type="button" className="novatext-template-item" onClick={() => insertTemplate(template)}>
                      <span className="text-sm font-bold text-slate-900">{template.title}</span>
                      <span className="mt-1 text-xs leading-5 text-slate-500">{template.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {!Object.keys(groupedTemplates).length ? <div className="px-2 py-6 text-center text-sm text-slate-500">No templates found.</div> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
