"use client";

import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { EditorContent } from "./EditorContent.jsx";
import { EditorProvider } from "./EditorProvider.jsx";
import { EditorShell } from "./EditorShell.jsx";
import { BubbleToolbar } from "../toolbars/BubbleToolbar.jsx";
import { ClassicToolbar } from "../toolbars/ClassicToolbar.jsx";
import { FloatingToolbar } from "../toolbars/FloatingToolbar.jsx";
import { MinimalToolbar } from "../toolbars/MinimalToolbar.jsx";
import { SlashCommandMenu } from "../toolbars/SlashCommandMenu.jsx";
import { useEditorCommands } from "../hooks/useEditorCommands.js";
import { useEditorStats } from "../hooks/useEditorStats.js";
import { useNovaEditor } from "../hooks/useNovaEditor.js";
import { getTemplatesForPreset } from "../presets/contentTemplates.js";
import { resolvePreset } from "../presets/editorPresets.js";
import { exportContent, getOutputFromEditor } from "../utils/exportUtils.js";
import { validateEditorContent } from "../utils/validationUtils.js";

export const NovaTextEditor = forwardRef(function NovaTextEditor(
  {
    value,
    defaultValue,
    onChange,
    onUpdate,
    onBlur,
    onFocus,
    onSave,
    placeholder,
    readOnly = false,
    disabled = false,
    autoFocus = false,
    outputFormat,
    preset = "blog",
    toolbar = true,
    toolbarMode,
    toolbarDensity = "normal",
    bubbleToolbar,
    floatingToolbar,
    slashCommands,
    statusBar,
    minHeight,
    maxHeight,
    height,
    className,
    editorClassName,
    contentClassName,
    theme = "default",
    themeTokens,
    extensions = [],
    plugins = [],
    customToolbarItems = [],
    customSlashCommands = [],
    contentTemplates,
    onImageUpload,
    onError,
    validation,
    onValidationChange,
  },
  ref,
) {
  const resolvedPreset = resolvePreset(preset);
  const resolved = {
    outputFormat: outputFormat || resolvedPreset.outputFormat || "html",
    toolbarMode: toolbarMode || resolvedPreset.toolbarMode || "classic",
    bubbleToolbar: bubbleToolbar ?? resolvedPreset.bubbleToolbar ?? true,
    floatingToolbar: floatingToolbar ?? resolvedPreset.floatingToolbar ?? false,
    slashCommands: slashCommands ?? resolvedPreset.slashCommands ?? true,
    statusBar: statusBar ?? resolvedPreset.statusBar ?? true,
    minHeight: minHeight ?? resolvedPreset.minHeight ?? 240,
    placeholder: placeholder || resolvedPreset.placeholder || "Start writing...",
    validation: validation || resolvedPreset.validation,
  };

  const pluginToolbarItems = plugins.flatMap((plugin) => plugin.toolbarItems || []);
  const pluginSlashCommands = plugins.flatMap((plugin) => plugin.slashCommands || []);
  const pluginTemplates = plugins.flatMap((plugin) => plugin.contentTemplates || []);
  const presetTemplates = getTemplatesForPreset(preset);
  const mergedContentTemplates = [...presetTemplates, ...pluginTemplates, ...(contentTemplates || [])];
  const mergedToolbarItems = [...pluginToolbarItems, ...customToolbarItems];
  const mergedSlashCommands = [...pluginSlashCommands, ...customSlashCommands];

  const editor = useNovaEditor({
    value,
    defaultValue,
    onChange,
    onUpdate,
    onBlur,
    onFocus,
    outputFormat: resolved.outputFormat,
    readOnly: readOnly || disabled,
    autoFocus,
    placeholder: resolved.placeholder,
    extensions,
    plugins,
    validation: resolved.validation,
    onValidationChange,
  });

  const commands = useEditorCommands(editor);
  const stats = useEditorStats(editor);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => editor?.commands.focus(),
      blur: () => editor?.commands.blur(),
      clearContent: () => editor?.commands.clearContent(),
      setContent: (content) => editor?.commands.setContent(content),
      insertContent: (content) => editor?.commands.insertContent(content),
      getHTML: () => editor?.getHTML() || "",
      getJSON: () => editor?.getJSON() || null,
      getMarkdown: () => getOutputFromEditor(editor, "markdown"),
      getText: () => editor?.getText() || "",
      exportContent: (format) => exportContent(editor, format || resolved.outputFormat),
      save: () => onSave?.(getOutputFromEditor(editor, resolved.outputFormat), editor),
      validate: () =>
        validateEditorContent({
          html: editor?.getHTML() || "",
          json: editor?.getJSON() || null,
          rules: resolved.validation || {},
        }),
      editor,
    }),
    [editor, onSave, resolved.outputFormat, resolved.validation],
  );

  const contextValue = useMemo(() => ({ editor, commands, stats, preset: resolvedPreset }), [commands, editor, resolvedPreset, stats]);
  const toolbarProps = {
    editor,
    commands,
    density: toolbarDensity,
    customItems: mergedToolbarItems,
    contentTemplates: mergedContentTemplates,
    onImageUpload,
    outputFormat: resolved.outputFormat,
  };

  try {
    return (
      <EditorProvider value={contextValue}>
        <EditorShell className={className} theme={theme} themeTokens={themeTokens} disabled={disabled}>
          {toolbar && resolved.toolbarMode === "classic" ? <ClassicToolbar {...toolbarProps} /> : null}
          {toolbar && resolved.toolbarMode === "minimal" ? <MinimalToolbar {...toolbarProps} /> : null}
          {toolbar && resolved.toolbarMode === "floating" ? <FloatingToolbar {...toolbarProps} /> : null}
          <div className="novatext-content-wrap">
            {resolved.bubbleToolbar ? <BubbleToolbar editor={editor} commands={commands} /> : null}
            {resolved.slashCommands ? <SlashCommandMenu editor={editor} commands={commands} customCommands={mergedSlashCommands} contentTemplates={mergedContentTemplates} /> : null}
            <EditorContent editor={editor} className={contentClassName || editorClassName} minHeight={resolved.minHeight} maxHeight={maxHeight} height={height} />
          </div>
          {resolved.statusBar ? (
            <div className="novatext-statusbar">
              <span>{stats.words} words</span>
              <span>{stats.characters} chars</span>
              <span>{stats.readingTime} min read</span>
            </div>
          ) : null}
        </EditorShell>
      </EditorProvider>
    );
  } catch (error) {
    onError?.(error);
    throw error;
  }
});
