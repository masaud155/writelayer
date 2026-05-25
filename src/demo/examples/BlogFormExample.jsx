import React, { useState } from "react";
import { NovaTextEditor } from "../../package/index.js";

export function BlogFormExample() {
  const [content, setContent] = useState("");
  return (
    <Example title="Blog Form">
      <NovaTextEditor value={content} onChange={setContent} preset="blog" placeholder="Write your blog content..." outputFormat="html" />
    </Example>
  );
}

export function Example({ title, children }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-base font-bold">{title}</h2>
        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">NovaTextEditor</span>
      </div>
      {children}
    </article>
  );
}
