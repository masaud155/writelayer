import React, { createContext, useContext } from "react";

const NovaEditorContext = createContext(null);

export function EditorProvider({ value, children }) {
  return <NovaEditorContext.Provider value={value}>{children}</NovaEditorContext.Provider>;
}

export function useNovaEditorContext() {
  const context = useContext(NovaEditorContext);
  if (!context) throw new Error("useNovaEditorContext must be used inside EditorProvider.");
  return context;
}
