import React from "react";

const sections = [
  ["Installation", "npm install @novatext/react-editor @tiptap/react @tiptap/starter-kit react react-dom"],
  ["Basic Usage", "Import NovaTextEditor and the package CSS, then pass value, onChange, preset, and outputFormat."],
  ["Presets", "Use blog, comment, cms, email, docs, or minimal to get production-friendly defaults."],
  ["Toolbar Modes", "Use classic, minimal, floating, bubbleToolbar, or toolbar={false} for headless mode."],
  ["Image Upload", "Pass onImageUpload(file) and return the hosted URL. Upload storage remains in your app."],
  ["Form Integration", "Works with controlled state, uncontrolled defaults, Formik, and React Hook Form Controller."],
  ["Next.js", "Use a client component or dynamic import with ssr:false, then import the CSS in your app."],
  ["Themes", "Use theme plus themeTokens to control accent, radius, font, background, and border tokens."],
  ["Plugin System", "Plugins can contribute toolbarItems, slashCommands, extensions, keyboard shortcuts, and export handlers."],
];

export function DocsPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-6">
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map(([title, body]) => (
          <article key={title} className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-base font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
