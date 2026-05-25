import Image from "@tiptap/extension-image";

export const NovaImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      alt: { default: "" },
      title: { default: "" },
      caption: { default: "" },
      align: { default: "center" },
      width: { default: null },
    };
  },
  renderHTML({ HTMLAttributes }) {
    const style = [
      HTMLAttributes.width ? `width:${HTMLAttributes.width}` : "",
      HTMLAttributes.align === "left" ? "margin-right:auto" : "",
      HTMLAttributes.align === "right" ? "margin-left:auto" : "",
      HTMLAttributes.align === "center" ? "margin-left:auto;margin-right:auto" : "",
      "display:block",
    ]
      .filter(Boolean)
      .join(";");
    return ["img", { ...HTMLAttributes, style }];
  },
});
