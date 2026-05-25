import { useMemo } from "react";

export function useEditorStats(editor) {
  const text = editor?.getText?.() || "";
  return useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const readingTime = Math.max(1, Math.ceil(words / 225));
    return { words, characters, readingTime };
  }, [text]);
}
