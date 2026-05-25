import React from "react";
import { cn } from "../utils/styleUtils.js";

export function ToolbarButton({ icon: Icon, label, active, disabled, onClick, children, className }) {
  return (
    <button
      type="button"
      className={cn("novatext-button", className)}
      data-active={active ? "true" : "false"}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      title={label}
      aria-label={label}
    >
      {Icon ? <Icon size={16} strokeWidth={2.1} /> : null}
      {children}
    </button>
  );
}
