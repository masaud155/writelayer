import { blogPreset } from "./blogPreset.js";
import { commentPreset } from "./commentPreset.js";
import { cmsPreset } from "./cmsPreset.js";
import { docsPreset } from "./docsPreset.js";
import { emailPreset } from "./emailPreset.js";
import { minimalPreset } from "./minimalPreset.js";

export const editorPresets = {
  blog: blogPreset,
  comment: commentPreset,
  cms: cmsPreset,
  email: emailPreset,
  docs: docsPreset,
  minimal: minimalPreset,
};

export function resolvePreset(preset) {
  if (!preset) return {};
  if (typeof preset === "object") return preset;
  return editorPresets[preset] || {};
}
