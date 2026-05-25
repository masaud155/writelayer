import React, { useMemo, useState } from "react";
import { FloatingMenu } from "@tiptap/react";
import { Code2, FilePlus2, Heading1, Heading2, Heading3, Image, Link, List, ListOrdered, Minus, Quote, Table, Text, TriangleAlert } from "lucide-react";

export function SlashCommandMenu({ editor, commands, customCommands = [], contentTemplates = [] }) {
  const [query, setQuery] = useState("");
  const items = useMemo(
    () => [
      { id: "text", label: "Text", description: "Plain paragraph", icon: Text, action: commands.setParagraph },
      { id: "h1", label: "Heading 1", description: "Large section heading", icon: Heading1, action: () => commands.setHeading(1) },
      { id: "h2", label: "Heading 2", description: "Medium section heading", icon: Heading2, action: () => commands.setHeading(2) },
      { id: "h3", label: "Heading 3", description: "Small section heading", icon: Heading3, action: () => commands.setHeading(3) },
      { id: "bullet", label: "Bullet list", description: "Unordered list", icon: List, action: commands.toggleBulletList },
      { id: "numbered", label: "Numbered list", description: "Ordered list", icon: ListOrdered, action: commands.toggleOrderedList },
      { id: "quote", label: "Quote", description: "Block quotation", icon: Quote, action: commands.toggleBlockquote },
      { id: "code", label: "Code block", description: "Formatted code", icon: Code2, action: commands.toggleCodeBlock },
      { id: "divider", label: "Divider", description: "Horizontal rule", icon: Minus, action: commands.insertDivider },
      { id: "image", label: "Image", description: "Image URL placeholder", icon: Image, action: () => commands.insertImage({ src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80", alt: "Writing desk" }) },
      { id: "table", label: "Table", description: "Comparison table", icon: Table, action: commands.insertTable },
      { id: "callout", label: "Callout", description: "Highlighted information", icon: TriangleAlert, action: () => commands.insertCallout("info") },
      { id: "link", label: "Link", description: "Inline link placeholder", icon: Link, action: () => commands.setLink("https://example.com") },
      ...contentTemplates.map((template) => ({
        id: `template-${template.id}`,
        label: template.title,
        description: template.description || "Insert reusable content template",
        icon: template.icon || FilePlus2,
        action: ({ editor: activeEditor }) => {
          const content = typeof template.content === "function" ? template.content({ editor: activeEditor }) : template.content;
          activeEditor?.chain().focus().insertContent(content || "").run();
          template.action?.({ editor: activeEditor });
        },
      })),
      ...customCommands,
    ],
    [commands, contentTemplates, customCommands],
  );
  const filtered = items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  if (!editor) return null;

  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{ duration: 120 }}
      shouldShow={({ state }) => {
        const { $from } = state.selection;
        const textBefore = $from.parent.textBetween(0, $from.parentOffset, null, "\ufffc");
        const match = textBefore.match(/\/([A-Za-z0-9 ]*)$/);
        setQuery(match?.[1] || "");
        return Boolean(match);
      }}
    >
      <div className="novatext-popover novatext-slash-menu">
        {filtered.map((item, index) => {
          const Icon = item.icon || Text;
          return (
            <button
              key={item.id || item.label}
              type="button"
              className="novatext-slash-item"
              data-active={index === 0 ? "true" : "false"}
              onClick={() => {
                editor.chain().focus().deleteRange({ from: editor.state.selection.from - query.length - 1, to: editor.state.selection.from }).run();
                item.action?.({ editor });
              }}
            >
              <Icon size={17} />
              <span>
                <span className="block text-sm font-semibold">{item.label}</span>
                <span className="block text-xs text-slate-500">{item.description}</span>
              </span>
            </button>
          );
        })}
      </div>
    </FloatingMenu>
  );
}
