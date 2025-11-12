import hljs from "highlight.js";
import ReactQuill from "react-quill-new";

export const quillModules = (quillRef: React.RefObject<ReactQuill | null>) => ({
  syntax: { highlight: hljs },
  toolbar: {
    container: [
      [{ font: ["sans-serif", "serif", "monospace", "arial", "georgia"] }],
      [{ header: [1, 2, 3, false] }],
      [{ color: [] }, { background: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      ["clean"],
    ],
    handlers: {
      image: () => {
        const url = prompt("Ingresa la URL de la imagen");
        if (url && quillRef.current) {
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          if (range) editor.insertEmbed(range.index, "image", url, "user");
        }
      },
    },
  },
});

export const quillFormats = [
  "font",
  "header",
  "color",
  "background",
  "bold",
  "italic",
  "underline",
  "strike",
  "script",
  "align",
  "blockquote",
  "code-block",
  "list",
  "indent",
  "link",
  "image",
  "video",
];
