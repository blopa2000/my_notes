import Quill from 'quill';

let isInitialized = false;

export function registerQuill() {
  if (isInitialized) return;
  isInitialized = true;

  const fonts = ['sans-serif', 'serif', 'monospace', 'arial', 'georgia'];
  const Font = Quill.import('attributors/class/font') as { whitelist: string[] };
  Font.whitelist = fonts;
  Quill.register('formats/font', Font, true);


}
