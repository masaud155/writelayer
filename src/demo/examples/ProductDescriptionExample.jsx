import React, { useState } from "react";
import { NovaTextEditor } from "../../package/index.js";
import { Example } from "./BlogFormExample.jsx";

export function ProductDescriptionExample() {
  const [description, setDescription] = useState("");
  return (
    <Example title="Product Description">
      <NovaTextEditor value={description} onChange={setDescription} preset="cms" theme="compact" placeholder="Describe features, specs, and care instructions..." />
    </Example>
  );
}
