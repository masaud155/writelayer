import React, { useState } from "react";
import { NovaTextEditor } from "../../package/index.js";
import { Example } from "./BlogFormExample.jsx";

export function CommentBoxExample() {
  const [comment, setComment] = useState("");
  return (
    <Example title="Comment Box">
      <NovaTextEditor value={comment} onChange={setComment} preset="comment" placeholder="Write a reply..." />
    </Example>
  );
}
