import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import { useEffect, useState } from "react";
import { TaskItem, TaskList, BulletList, OrderedList } from "@tiptap/extension-list";
import { all, createLowlight } from "lowlight";
import { COLORS_HIGHLIGHT } from "@/utils/constans";
import type { TiptapEditorProps } from "@/utils/types";

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignRightIcon,
  AlignLeftIcon,
  BlockquoteIcon,
  BoldIcon,
  CodeBlockIcon,
  HeadingOneIcon,
  HeadingThreeIcon,
  HeadingTwoIcon,
  HighlighterIcon,
  ImagePlusIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  StrikeIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
} from "@/components/tiptap-icons";

import Placeholder from "@tiptap/extension-placeholder";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

import "../styles/tiptap.css";

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

function decodeHTMLEntities(text: string) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

const TiptapEditor = ({ value, onChange }: TiptapEditorProps) => {
  const [showMenuColors, setShowMenuColors] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          autolink: true,
        },
        codeBlock: false,
        bulletList: false,
        orderedList: false,
      }),
      Image,
      TaskList,
      BulletList,
      OrderedList,
      Superscript,
      Subscript,
      Highlight.configure({
        multicolor: true,
      }),
      TaskItem.configure({ nested: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Placeholder.configure({
        placeholder: "Mi nota...",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold"),
        isItalic: ctx.editor.isActive("italic"),
        isUnderLine: ctx.editor.isActive("underline"),
        isCodeBlock: ctx.editor.isActive("codeBlock"),
        isHeading1: ctx.editor.isActive("heading", { level: 1 }),
        isHeading2: ctx.editor.isActive("heading", { level: 2 }),
        isHeading3: ctx.editor.isActive("heading", { level: 3 }),
        isOrderedList: ctx.editor.isActive("orderedList"),
        isBulletList: ctx.editor.isActive("bulletList"),
        isTaskList: ctx.editor.isActive("taskList"),
        isImage: ctx.editor.isActive("image"),
        isLink: ctx.editor.isActive("link"),
        isAlignLeft: ctx.editor.isActive({ textAlign: "left" }),
        isAlignCenter: ctx.editor.isActive({ textAlign: "center" }),
        isAlignRight: ctx.editor.isActive({ textAlign: "right" }),
        isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }),
        IsStrike: ctx.editor.isActive("strike"),
        isBlockquote: ctx.editor.isActive("blockquote"),
        isSuperscript: ctx.editor.isActive("superscript"),
        isSubscript: ctx.editor.isActive("subscript"),
      };
    },
  });

  // 👇 Cargamos el contenido inicial, ya decodificado
  useEffect(() => {
    if (editor) {
      const decoded = decodeHTMLEntities(value || "");
      editor.commands.setContent(decoded);
    }
  }, [editor, value]);

  const commands = {
    toggleBold: () => editor.chain().focus().toggleBold().run(),
    toggleItalic: () => editor.chain().focus().toggleItalic().run(),
    toggleUnderline: () => editor.chain().focus().toggleUnderline().run(),
    toggleCodeBlock: () => editor.chain().focus().toggleCodeBlock().run(),
    toggleH1: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    toggleH2: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    toggleH3: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    toggleOrderedList: () => editor.chain().focus().toggleOrderedList().run(),
    toggleBulletList: () => editor.chain().focus().toggleBulletList().run(),
    toggleTaskList: () => editor.chain().focus().toggleTaskList().run(),
    toggleSuperscript: () => editor.chain().focus().toggleSuperscript().run(),
    toggleSubscript: () => editor.chain().focus().toggleSubscript().run(),
    toggleHighlight: (color: string) => editor.chain().focus().toggleHighlight({ color }).run(),
    addImage: () => {
      const url = window.prompt("url");
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    },
    addLink: () => {
      const lastUrl = editor.getAttributes("link").href;
      const url = window.prompt("url", lastUrl);
      if (url) {
        console.log(url);

        editor.chain().focus().setLink({ href: url }).run();
      }
    },
    setTextAlignCenter: () => editor.chain().focus().setTextAlign("center").run(),
    setTextAlignLeft: () => editor.chain().focus().setTextAlign("left").run(),
    setTextAlignRight: () => editor.chain().focus().setTextAlign("right").run(),
    setTextAlignJustify: () => editor.chain().focus().setTextAlign("justify").run(),
    setStrike: () => editor.chain().focus().toggleStrike().run(),
    toggleBlockquote: () => editor.chain().focus().toggleBlockquote().run(),
  };

  if (!editor) return null;

  return (
    <div className="editor-wrapper">
      <div className="editor-toolbar">
        <div className="left">
          <button
            type="button"
            onClick={commands.toggleBold}
            className={editorState.isBold ? "active" : ""}
          >
            <BoldIcon />
          </button>
          <button
            type="button"
            onClick={commands.toggleItalic}
            className={editorState.isItalic ? "active" : ""}
          >
            <ItalicIcon />
          </button>
          <button
            type="button"
            onClick={commands.toggleUnderline}
            className={editorState.isUnderLine ? "active" : ""}
          >
            <UnderlineIcon />
          </button>
          <button
            type="button"
            onClick={commands.setStrike}
            className={editorState.IsStrike ? "active" : ""}
          >
            <StrikeIcon />
          </button>
          <button
            type="button"
            onClick={commands.toggleCodeBlock}
            className={editorState.isCodeBlock ? "active" : ""}
          >
            <CodeBlockIcon />
          </button>
          <button
            type="button"
            onClick={commands.toggleBlockquote}
            className={editorState.isBlockquote ? "active" : ""}
          >
            <BlockquoteIcon />
          </button>
          <button
            type="button"
            onClick={commands.toggleH1}
            className={editorState.isHeading1 ? "active" : ""}
          >
            <HeadingOneIcon />
          </button>
          <button
            type="button"
            onClick={commands.toggleH2}
            className={editorState.isHeading2 ? "active" : ""}
          >
            <HeadingTwoIcon />
          </button>
          <button
            type="button"
            onClick={commands.toggleH3}
            className={editorState.isHeading3 ? "active" : ""}
          >
            <HeadingThreeIcon />
          </button>
          <button
            type="button"
            onClick={commands.toggleOrderedList}
            className={editorState.isOrderedList ? "active" : ""}
          >
            <ListOrderedIcon />
          </button>
          <button
            type="button"
            onClick={commands.toggleBulletList}
            className={editorState.isBulletList ? "active" : ""}
          >
            <ListIcon />
          </button>
          <button
            type="button"
            onClick={commands.toggleTaskList}
            className={editorState.isTaskList ? "active" : ""}
          >
            <ListTodoIcon />
          </button>
          <button
            type="button"
            onClick={commands.addImage}
            className={editorState.isImage ? "active" : ""}
          >
            <ImagePlusIcon />
          </button>
          <button
            type="button"
            onClick={commands.addLink}
            className={editorState.isLink ? "active" : ""}
          >
            <LinkIcon />
          </button>
          <button
            type="button"
            onClick={commands.setTextAlignCenter}
            className={editorState.isAlignCenter ? "active" : ""}
          >
            <AlignCenterIcon />
          </button>
          <button
            type="button"
            onClick={commands.setTextAlignLeft}
            className={editorState.isAlignLeft ? "active" : ""}
          >
            <AlignLeftIcon />
          </button>
          <button
            type="button"
            onClick={commands.setTextAlignRight}
            className={editorState.isAlignRight ? "active" : ""}
          >
            <AlignRightIcon />
          </button>
          <button
            type="button"
            onClick={commands.setTextAlignJustify}
            className={editorState.isAlignJustify ? "active" : ""}
          >
            <AlignJustifyIcon />
          </button>

          <button
            type="button"
            onClick={commands.toggleSuperscript}
            className={editorState.isSuperscript ? "active" : ""}
          >
            <SuperscriptIcon />
          </button>
          <button
            type="button"
            onClick={commands.toggleSubscript}
            className={editorState.isSubscript ? "active" : ""}
          >
            <SubscriptIcon />
          </button>

          <div className="menu-color-container">
            <button type="button" onClick={() => setShowMenuColors(!showMenuColors)}>
              <HighlighterIcon />
            </button>

            <div
              className="menu-colors-float"
              style={{
                opacity: showMenuColors ? 1 : 0,
                transform: showMenuColors ? "translateY(0)" : "translateY(-10px)",
                pointerEvents: showMenuColors ? "auto" : "none",
                transition: "all 0.25s ease",
              }}
            >
              {COLORS_HIGHLIGHT.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => commands.toggleHighlight(color)}
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
};

export default TiptapEditor;
