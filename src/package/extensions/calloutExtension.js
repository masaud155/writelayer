import { Node, mergeAttributes } from "@tiptap/core";

export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,
  addAttributes() {
    return {
      kind: {
        default: "info",
      },
    };
  },
  parseHTML() {
    return [{ tag: "div[data-callout]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-callout": HTMLAttributes.kind || "info",
        class: `novatext-callout novatext-callout-${HTMLAttributes.kind || "info"}`,
      }),
      0,
    ];
  },
  addCommands() {
    return {
      setCallout:
        (kind = "info") =>
        ({ commands }) =>
          commands.wrapIn(this.name, { kind }),
    };
  },
});
