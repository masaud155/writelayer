import { getPlainTextFromHtml } from "./htmlUtils.js";

export function htmlToMarkdown(html = "") {
  return String(html)
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, "> $1\n\n")
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")
    .replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`")
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
    .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function jsonToMarkdown(json) {
  if (!json) return "";
  return walkNode(json).trim();
}

function walkNode(node) {
  if (!node) return "";
  if (node.type === "text") return node.text || "";
  const children = (node.content || []).map(walkNode).join("");
  if (node.type === "heading") return `${"#".repeat(node.attrs?.level || 1)} ${children}\n\n`;
  if (node.type === "paragraph") return `${children}\n\n`;
  if (node.type === "bulletList") return `${children}\n`;
  if (node.type === "orderedList") return `${children}\n`;
  if (node.type === "listItem") return `- ${children.trim()}\n`;
  if (node.type === "blockquote") return `> ${children.trim()}\n\n`;
  if (node.type === "codeBlock") return `\`\`\`\n${children}\n\`\`\`\n\n`;
  return children || getPlainTextFromHtml(String(node));
}
