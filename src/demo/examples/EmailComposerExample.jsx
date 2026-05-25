import React, { useState } from "react";
import { NovaTextEditor } from "../../package/index.js";
import { Example } from "./BlogFormExample.jsx";

export function EmailComposerExample() {
  const [email, setEmail] = useState("");
  return (
    <Example title="Email Composer">
      <NovaTextEditor value={email} onChange={setEmail} preset="email" placeholder="Compose the campaign..." outputFormat="html" />
    </Example>
  );
}
