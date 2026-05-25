import Placeholder from "@tiptap/extension-placeholder";

export function createPlaceholderExtension(placeholder) {
  return Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") return "What is the heading?";
      return placeholder || "Start writing...";
    },
  });
}
