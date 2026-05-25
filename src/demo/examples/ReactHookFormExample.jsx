import React, { useState } from "react";
import { NovaTextEditor } from "../../package/index.js";
import { Example } from "./BlogFormExample.jsx";

export function ReactHookFormExample() {
  const [field, setField] = useState("");
  return (
    <Example title="React Hook Form Pattern">
      <NovaTextEditor value={field} onChange={setField} preset="minimal" placeholder="Controller field.value goes here..." />
      <pre className="mt-3 rounded-md bg-slate-950 p-3 text-xs text-slate-100">{`<Controller
  name="content"
  control={control}
  render={({ field }) => (
    <NovaTextEditor
      value={field.value}
      onChange={field.onChange}
      preset="blog"
    />
  )}
/>`}</pre>
    </Example>
  );
}
