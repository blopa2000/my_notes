import { useEffect, useRef } from "react";
import ReactQuill from "react-quill-new";
import type { TiptapEditorProps } from "@/utils/types";
import { registerQuill } from "@/utils/registerQuill";
import { quillModules, quillFormats } from "@/utils/quillModules";
import "react-quill-new/dist/quill.snow.css";
import "@/styles/quillEditor.css";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";

export function QuillEditor({ value, onChange }: TiptapEditorProps) {
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    registerQuill();
  }, []);

  useEffect(() => {
    const blocks = document.querySelectorAll(".ql-code-block-container");
    blocks.forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [value]);

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={quillModules(quillRef)}
      formats={quillFormats}
    />
  );
}
