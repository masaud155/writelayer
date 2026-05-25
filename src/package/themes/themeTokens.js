export const themeTokens = {
  accent: "#2563eb",
  radius: "10px",
  fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
  editorBackground: "#ffffff",
  editorForeground: "#111827",
  editorBorder: "#d9e1ea",
  editorMuted: "#f4f7fb",
};

export function tokensToCssVariables(tokens = {}) {
  const merged = { ...themeTokens, ...tokens };
  return {
    "--nt-editor-accent": merged.accent,
    "--nt-editor-radius": merged.radius,
    "--nt-editor-font": merged.fontFamily,
    "--nt-editor-background": merged.editorBackground,
    "--nt-editor-foreground": merged.editorForeground,
    "--nt-editor-border": merged.editorBorder,
    "--nt-editor-muted": merged.editorMuted,
  };
}
