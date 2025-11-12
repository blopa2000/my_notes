import Quill from "quill";
import hljs from "highlight.js";

let isInitialized = false;

export function registerQuill() {
  if (isInitialized) return;
  isInitialized = true;

  hljs.configure({
    languages: ["javascript", "typescript", "python", "html", "css"],
  });

  const fonts = ["sans-serif", "serif", "monospace", "arial", "georgia"];
  const Font = Quill.import("attributors/class/font") as { whitelist: string[] };
  Font.whitelist = fonts;
  Quill.register("formats/font", Font, true);

  Quill.register("modules/syntax", Quill.import("modules/syntax"), true);
}
