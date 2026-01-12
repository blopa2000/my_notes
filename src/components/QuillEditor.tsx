import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import type { TiptapEditorProps } from '@/utils/types';
import { registerQuill } from '@/utils/registerQuill';
import { quillModules, quillFormats } from '@/utils/quillModules';
import 'react-quill-new/dist/quill.snow.css';
import '@/styles/quillEditor.css';

export function QuillEditor({ value, onChange }: TiptapEditorProps) {
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    registerQuill();
  }, []);

  useEffect(() => {
    const editor = document.querySelector('.ql-editor');

    if (!editor) return;

    const preventScroll = (e: Event) => {
      e.stopPropagation();
    };

    editor.addEventListener('scroll', preventScroll, true);

    return () => {
      editor.removeEventListener('scroll', preventScroll, true);
    };
  }, []);

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
