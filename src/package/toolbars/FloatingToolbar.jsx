import React from "react";
import { Toolbar } from "./Toolbar.jsx";

export function FloatingToolbar(props) {
  return (
    <div className="novatext-floating">
      <Toolbar {...props} />
    </div>
  );
}
