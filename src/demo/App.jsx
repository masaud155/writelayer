import React, { useState } from "react";
import { BookOpen, Boxes, FlaskConical, PackageCheck } from "lucide-react";
import { DocsPage } from "./pages/DocsPage.jsx";
import { ExamplesPage } from "./pages/ExamplesPage.jsx";
import { PlaygroundPage } from "./pages/PlaygroundPage.jsx";

const pages = [
  { id: "playground", label: "Playground", icon: FlaskConical, component: PlaygroundPage },
  { id: "examples", label: "Examples", icon: Boxes, component: ExamplesPage },
  { id: "docs", label: "Docs", icon: BookOpen, component: DocsPage },
];

export default function App() {
  const [active, setActive] = useState("playground");
  const ActivePage = pages.find((page) => page.id === active)?.component || PlaygroundPage;

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white shadow-sm">
              <PackageCheck size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-normal">NovaText Editor</h1>
              <p className="text-sm text-slate-500">A package-first rich text editor for production React forms.</p>
            </div>
          </div>
          <nav className="flex rounded-lg border border-slate-200 bg-slate-100 p-1">
            {pages.map((page) => {
              const Icon = page.icon;
              const isActive = active === page.id;
              return (
                <button
                  key={page.id}
                  type="button"
                  className={`flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold transition ${isActive ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
                  onClick={() => setActive(page.id)}
                >
                  <Icon size={16} /> {page.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-5 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">React library preview</p>
            <h2 className="mt-2 text-2xl font-bold tracking-normal text-slate-950 md:text-3xl">Modern editor UI without building a writing app.</h2>
          </div>
          <Metric label="Package shape" value="JSX only" />
          <Metric label="Use cases" value="Forms, CMS, docs" />
        </div>
      </section>
      <ActivePage />
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-[#fbfcfe] p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</div>
      <div className="mt-2 text-lg font-bold text-slate-950">{value}</div>
    </div>
  );
}
