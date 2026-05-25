import { getPlainTextFromHtml, isEmptyHtml } from "./htmlUtils.js";

export function validateEditorContent({ html = "", json = null, rules = {} }) {
  const text = getPlainTextFromHtml(html);
  const words = text ? text.split(/\s+/).filter(Boolean) : [];
  const images = countNodes(json, "image");
  const headings = countNodes(json, "heading");
  const errors = [];

  if (rules.required && isEmptyHtml(html)) errors.push("Content is required.");
  if (rules.minWords && words.length < rules.minWords) errors.push(`Minimum ${rules.minWords} words required.`);
  if (rules.maxWords && words.length > rules.maxWords) errors.push(`Maximum ${rules.maxWords} words allowed.`);
  if (rules.minCharacters && text.length < rules.minCharacters) errors.push(`Minimum ${rules.minCharacters} characters required.`);
  if (rules.maxCharacters && text.length > rules.maxCharacters) errors.push(`Maximum ${rules.maxCharacters} characters allowed.`);
  if (rules.requireHeading && headings === 0) errors.push("At least one heading is required.");
  if (rules.maxImages && images > rules.maxImages) errors.push(`Maximum ${rules.maxImages} images allowed.`);
  if (rules.requireImageAltText && hasImageWithoutAlt(json)) errors.push("Every image needs alt text.");

  if (typeof rules.validate === "function") {
    const customResult = rules.validate({ html, json, text, words: words.length, images });
    if (customResult === false) errors.push("Content did not pass custom validation.");
    if (typeof customResult === "string") errors.push(customResult);
  }

  return {
    valid: errors.length === 0,
    errors,
    stats: {
      characters: text.length,
      words: words.length,
      images,
      headings,
    },
  };
}

function countNodes(node, type) {
  if (!node) return 0;
  const own = node.type === type ? 1 : 0;
  return own + (node.content || []).reduce((total, child) => total + countNodes(child, type), 0);
}

function hasImageWithoutAlt(node) {
  if (!node) return false;
  if (node.type === "image") return !node.attrs?.alt;
  return (node.content || []).some(hasImageWithoutAlt);
}
