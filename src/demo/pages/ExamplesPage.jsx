import React from "react";
import { BlogFormExample } from "../examples/BlogFormExample.jsx";
import { CMSFieldExample } from "../examples/CMSFieldExample.jsx";
import { CommentBoxExample } from "../examples/CommentBoxExample.jsx";
import { EmailComposerExample } from "../examples/EmailComposerExample.jsx";
import { ProductDescriptionExample } from "../examples/ProductDescriptionExample.jsx";
import { ReactHookFormExample } from "../examples/ReactHookFormExample.jsx";

export function ExamplesPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-6">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Implementation patterns</p>
          <h2 className="mt-1 text-2xl font-bold">Drop-in examples for real forms</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-500">Each example uses the same reusable package component with different presets, theme choices, and form wiring.</p>
      </div>
      <div className="grid gap-5">
        <BlogFormExample />
        <CommentBoxExample />
        <CMSFieldExample />
        <ProductDescriptionExample />
        <EmailComposerExample />
        <ReactHookFormExample />
      </div>
    </section>
  );
}
