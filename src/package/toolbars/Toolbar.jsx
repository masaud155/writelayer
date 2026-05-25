import React from "react";
import {
  Bold,
  Code,
  Eraser,
  FilePlus2,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Image,
  Italic,
  List,
  ListOrdered,
  Palette,
  Pilcrow,
  Quote,
  Redo2,
  SeparatorHorizontal,
  Strikethrough,
  Table,
  Underline,
  Undo2,
} from "lucide-react";
import { ColorPicker } from "../controls/ColorPicker.jsx";
import { ExportMenu } from "../controls/ExportMenu.jsx";
import { ImageDialog } from "../controls/ImageDialog.jsx";
import { LinkDialog } from "../controls/LinkDialog.jsx";
import { SnippetMenu } from "../controls/SnippetMenu.jsx";
import { TableControls } from "../controls/TableControls.jsx";
import { ToolbarButton } from "./ToolbarButton.jsx";
import { ToolbarGroup } from "./ToolbarGroup.jsx";

export function Toolbar({ editor, commands, density = "normal", customItems = [], onImageUpload, outputFormat, contentTemplates = [] }) {
  if (!editor) return null;

  return (
    <div className="novatext-toolbar" data-density={density}>
      <ToolbarGroup>
        <ToolbarButton icon={Undo2} label="Undo" onClick={() => editor.chain().focus().undo().run()} />
        <ToolbarButton icon={Redo2} label="Redo" onClick={() => editor.chain().focus().redo().run()} />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarButton icon={Pilcrow} label="Paragraph" active={editor.isActive("paragraph")} onClick={commands.setParagraph} />
        <ToolbarButton icon={Heading1} label="Heading 1" active={editor.isActive("heading", { level: 1 })} onClick={() => commands.setHeading(1)} />
        <ToolbarButton icon={Heading2} label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => commands.setHeading(2)} />
        <ToolbarButton icon={Heading3} label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => commands.setHeading(3)} />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarButton icon={Bold} label="Bold" active={editor.isActive("bold")} onClick={commands.toggleBold} />
        <ToolbarButton icon={Italic} label="Italic" active={editor.isActive("italic")} onClick={commands.toggleItalic} />
        <ToolbarButton icon={Underline} label="Underline" active={editor.isActive("underline")} onClick={commands.toggleUnderline} />
        <ToolbarButton icon={Strikethrough} label="Strikethrough" active={editor.isActive("strike")} onClick={commands.toggleStrike} />
        <ToolbarButton icon={Code} label="Inline code" active={editor.isActive("code")} onClick={commands.toggleCode} />
      </ToolbarGroup>
      <ToolbarGroup>
        <ColorPicker label="Text color" icon={Palette} onSelect={commands.setColor} onClear={commands.unsetColor} />
        <ColorPicker label="Highlight" icon={Highlighter} onSelect={commands.setHighlight} onClear={commands.unsetHighlight} />
        <LinkDialog editor={editor} onSetLink={commands.setLink} onUnsetLink={commands.unsetLink} />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarButton icon={List} label="Bullet list" active={editor.isActive("bulletList")} onClick={commands.toggleBulletList} />
        <ToolbarButton icon={ListOrdered} label="Ordered list" active={editor.isActive("orderedList")} onClick={commands.toggleOrderedList} />
        <ToolbarButton icon={Quote} label="Quote" active={editor.isActive("blockquote")} onClick={commands.toggleBlockquote} />
        <ToolbarButton icon={SeparatorHorizontal} label="Divider" onClick={commands.insertDivider} />
      </ToolbarGroup>
      <ToolbarGroup>
        <SnippetMenu editor={editor} templates={contentTemplates} triggerIcon={FilePlus2} />
        <ImageDialog onImageUpload={onImageUpload} onInsert={commands.insertImage} triggerIcon={Image} />
        <TableControls editor={editor} triggerIcon={Table} onInsert={commands.insertTable} />
        <ToolbarButton icon={Eraser} label="Clear formatting" onClick={commands.clearFormatting} />
      </ToolbarGroup>
      {customItems.length ? (
        <ToolbarGroup>
          {customItems.map((item) => (
            <ToolbarButton key={item.id} icon={item.icon} label={item.label} onClick={() => item.action?.({ editor })}>
              {!item.icon ? item.label : null}
            </ToolbarButton>
          ))}
        </ToolbarGroup>
      ) : null}
      <ToolbarGroup>
        <ExportMenu editor={editor} outputFormat={outputFormat} />
      </ToolbarGroup>
    </div>
  );
}
