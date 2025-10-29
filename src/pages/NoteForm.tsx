import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth/AuthContext";
import { noteService } from "@/services/noteService";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import "@/styles/noteForm.css";
import { useNotes } from "@/context/notes/NotesContext";
import TiptapEditor from "@/components/TiptapEditor";

const NoteForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getNoteById, updateNote, addNote } = useNotes();
  const { noteId } = location.state || {};

  const [note, setNote] = useState({
    title: "",
    content: "",
    bgColor: "#ffffff",
    creationDate: "",
  });

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (noteId && user?.uid) {
      setLoading(true);
      const existingNote = getNoteById(noteId);
      if (existingNote) {
        setNote({
          title: existingNote.title,
          content: existingNote.content,
          bgColor: existingNote.bgColor,
          creationDate: existingNote.creationDate,
        });
      }
      setLoading(false);
    }
  }, [noteId, user, getNoteById]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return null;
    setLoading(true);
    try {
      if (note.title.length > 0) {
        if (noteId) {
          const data = {
            title: note.title,
            bgColor: note.bgColor,
            content: content.length > 0 ? content : note.content,
          };

          const lastUpdate = await noteService.updateNote(user.uid, noteId, data);

          updateNote({
            ...data,
            noteId,
            lastUpdate,
            creationDate: note.creationDate,
          });
        } else {
          const resNote = await noteService.createNote(user.uid, {
            ...note,
            content,
          });

          addNote(resNote);
        }
        navigate("/dashboard");
      } else {
        console.log("titulo es requerido");
        console.log(content);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (html: string) => {
    setContent(html);
  };

  return (
    <div className="edit-container">
      <h1 className="edit-title">{noteId ? "Editar nota" : "Nueva nota"}</h1>

      <div className="edit-box">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>

        <form className="edit-form" onSubmit={handleSubmit}>
          <button disabled={loading} type="submit" className="save-btn">
            {loading ? <Loader2 className="loading-icon" size={18} /> : <Save size={18} />}
            <span>{noteId ? "Guardar cambios" : "Crear nota"}</span>
          </button>
          <input
            className="edit-form-color"
            type="color"
            value={note.bgColor}
            onChange={(e) => setNote({ ...note, bgColor: e.target.value })}
          />
          <input
            className="edit-form-title"
            type="text"
            placeholder="Escribe un título..."
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />

          <TiptapEditor value={note.content} onChange={handleContentChange} />
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
