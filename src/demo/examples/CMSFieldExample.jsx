import React, { useState } from "react";
import { NovaTextEditor } from "../../package/index.js";
import { Example } from "./BlogFormExample.jsx";

export function CMSFieldExample() {
  const [value, setValue] = useState("<p>CMS content field with tables, images, links, and validation.</p>");
  return (
    <Example title="CMS Field">
      <NovaTextEditor value={value} onChange={setValue} preset="cms" validation={{ required: true, maxImages: 6 }} />
    </Example>
  );
}
