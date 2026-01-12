import ReactQuill from 'react-quill-new';
import type Quill from 'quill';

export const quillModules = (quillRef: React.RefObject<ReactQuill | null>) => ({
  syntax: false,

  toolbar: {
    container: [
      [{ font: ['sans-serif', 'serif', 'monospace', 'arial', 'georgia'] }],
      [{ header: [1, 2, 3, false] }],
      [{ color: [] }, { background: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ script: 'sub' }, { script: 'super' }],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],

    handlers: {
      image: () => {
        const url = prompt('Ingresa la URL de la imagen');
        if (url && quillRef.current) {
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          if (range) {
            editor.insertEmbed(range.index, 'image', url, 'user');
          }
        }
      },
    },
  },

  // 🔥 HISTORIAL (UNDO / REDO)
  history: {
    delay: 1000, // agrupa cambios
    maxStack: 200, // cantidad de pasos
    userOnly: true, // solo acciones del usuario
  },

  // ⌨️ ATAJOS DE TECLADO
  keyboard: {
    bindings: {
      undo: {
        key: 'z',
        shortKey: true,
        handler(this: { quill: Quill }) {
          this.quill.history.undo();
        },
      },
      redo: {
        key: 'y',
        shortKey: true,
        handler(this: { quill: Quill }) {
          this.quill.history.redo();
        },
      },
    },
  },
});

export const quillFormats = [
  'font',
  'header',
  'color',
  'background',
  'bold',
  'italic',
  'underline',
  'strike',
  'script',
  'align',
  'blockquote',
  'code-block',
  'list',
  'indent',
  'link',
  'image',
  'video',
];
