import React from "react";
import { cn } from "../utils/styleUtils.js";
import { tokensToCssVariables } from "../themes/themeTokens.js";
import { themes } from "../themes/themes.js";

export function EditorShell({ children, className, theme = "default", themeTokens, disabled }) {
  const presetTokens = themes[theme] || {};
  return (
    <div className={cn("novatext-editor", `novatext-theme-${theme}`, className)} style={tokensToCssVariables({ ...presetTokens, ...themeTokens })}>
      <div className="novatext-shell" data-disabled={disabled ? "true" : "false"}>
        {children}
      </div>
    </div>
  );
}
