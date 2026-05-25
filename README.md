# NovaText Editor

NovaText Editor is a package-first React rich text editor built with Vite, JSX, Tiptap, Tailwind CSS, Lucide icons, and modern editor UI patterns. It is designed as a React Quill alternative for production forms, CMS fields, admin panels, comments, email composers, product descriptions, docs, and knowledge base editors.

> This scaffold intentionally uses JavaScript and JSX only. There are no `.ts`, `.tsx`, TypeScript interfaces, enums, type definition files, or TypeScript config files.

## Features

- Plug-and-play `<NovaTextEditor />` component
- Controlled and uncontrolled usage
- Blog, comment, CMS, email, docs, and minimal presets
- Classic, minimal, floating, bubble, and headless toolbar modes
- Tiptap/ProseMirror editor engine
- Slash commands, bubble toolbar, color picker, links, images, tables, callouts, code blocks, lists, quotes, and task lists
- HTML, JSON, Markdown, and plain text output
- Word count, character count, and reading time
- Ref API for focus, clear, set content, insert content, export, and validation
- Image upload callback with no hardcoded storage logic
- Theme tokens and built-in themes
- Simple plugin system for toolbar items, slash commands, and extensions
- Reusable content templates and snippet insertion
- Demo pages for playground, examples, and docs
- Vite library mode ready for future npm publishing

## Installation

```bash
npm install @novatext/react-editor
npm install react react-dom @tiptap/react @tiptap/starter-kit
```

## Basic Usage

```jsx
import { useState } from "react";
import { NovaTextEditor } from "@novatext/react-editor";
import "@novatext/react-editor/styles.css";

export function BlogForm() {
  const [content, setContent] = useState("");

  return (
    <NovaTextEditor
      value={content}
      onChange={setContent}
      preset="blog"
      placeholder="Write your blog content..."
      outputFormat="html"
    />
  );
}
```

## React Hook Form

```jsx
<Controller
  name="content"
  control={control}
  render={({ field }) => (
    <NovaTextEditor
      value={field.value}
      onChange={field.onChange}
      preset="blog"
      placeholder="Write blog detail..."
    />
  )}
/>
```

## Next.js

```jsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "@novatext/react-editor/styles.css";

const NovaTextEditor = dynamic(
  () => import("@novatext/react-editor").then((mod) => mod.NovaTextEditor),
  { ssr: false },
);

export default function BlogForm() {
  const [content, setContent] = useState("");
  return <NovaTextEditor value={content} onChange={setContent} preset="blog" />;
}
```

## Presets

Use `preset="blog"`, `comment`, `cms`, `email`, `docs`, or `minimal`.

## Toolbar Modes

Use `toolbarMode="classic"`, `minimal`, or `floating`. Set `bubbleToolbar={true}` for selection UI or `toolbar={false}` for headless usage.

## Image Upload

```jsx
<NovaTextEditor
  preset="blog"
  onImageUpload={async (file) => {
    const url = await uploadToCloud(file);
    return url;
  }}
/>
```

## Themes

```jsx
<NovaTextEditor
  theme="notion"
  themeTokens={{
    accent: "#2563eb",
    radius: "12px",
    fontFamily: "Inter",
    editorBackground: "#ffffff",
  }}
/>
```

## Validation

```jsx
<NovaTextEditor
  validation={{
    minWords: 100,
    maxWords: 2000,
    required: true,
    requireImageAltText: true,
  }}
  onValidationChange={(result) => console.log(result)}
/>
```

## Output Formats

Set `outputFormat` to `html`, `json`, `markdown`, or `text`. The `onChange` callback receives that output format.

## Ref API

Available methods include `focus`, `blur`, `clearContent`, `setContent`, `insertContent`, `getHTML`, `getJSON`, `getMarkdown`, `getText`, `exportContent`, `save`, and `validate`.

## Plugin System

```jsx
const productPlugin = {
  name: "product-block",
  toolbarItems: [
    {
      id: "insert-product",
      label: "Product",
      action: ({ editor }) => editor.commands.insertContent("<p>Product block</p>"),
    },
  ],
  slashCommands: [],
  extensions: [],
};

<NovaTextEditor plugins={[productPlugin]} />;
```

## Content Templates

Add reusable insert blocks for your product, CMS, or support workflow. Templates appear in the toolbar template menu and can also be inserted through slash commands.

```jsx
<NovaTextEditor
  preset="cms"
  contentTemplates={[
    {
      id: "product-specs",
      title: "Product specs",
      description: "Reusable table for product detail pages",
      category: "Commerce",
      content: "<h2>Specifications</h2><table><tbody><tr><th>Attribute</th><th>Detail</th></tr></tbody></table>",
    },
  ]}
/>
```

## Props API

Core props include `value`, `defaultValue`, `onChange`, `onUpdate`, `onBlur`, `onFocus`, `onSave`, `placeholder`, `readOnly`, `disabled`, `autoFocus`, `outputFormat`, `preset`, `toolbar`, `toolbarMode`, `toolbarDensity`, `bubbleToolbar`, `floatingToolbar`, `slashCommands`, `statusBar`, `minHeight`, `maxHeight`, `height`, `className`, `editorClassName`, `contentClassName`, `theme`, `themeTokens`, `extensions`, `plugins`, `customToolbarItems`, `customSlashCommands`, `contentTemplates`, `onImageUpload`, `onError`, `validation`, and `onValidationChange`.

## Development

```bash
npm install
npm run dev
npm run build -- --mode lib
```

## Roadmap

- More robust Markdown serialization
- Resizable image node views
- Mention extension adapters
- Table cell color UI integration
- Accessibility polish for command menus and color controls

## License

MIT
