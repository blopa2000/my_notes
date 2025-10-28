import { useNotes } from "@/context/notes/NotesContext";
import "@/styles/modalDelete.css";
import { noteService } from "@/services/noteService";
import { useAuth } from "@/context/auth/AuthContext";
import { useEffect, useRef, useState } from "react";

function ModalDelete() {
  const { toggleModalDeleteNote, handleDelete, deleteNote } = useNotes();
  const { user } = useAuth();
  const [loading, setloading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleDeleteNote = async () => {
    if (user?.uid) {
      setloading(true);
      await noteService.deleteNote(user?.uid, handleDelete.noteId);
      deleteNote(handleDelete.noteId);
      setloading(false);
      toggleModalDeleteNote({ showAlert: false, noteId: "" });
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        toggleModalDeleteNote({ showAlert: false, noteId: "" });
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [toggleModalDeleteNote]);

  return (
    <div className="modal-container">
      <div className="modal-card" ref={modalRef}>
        <div className="modal-card-info">
          <h1>Eliminar Nota</h1>
          <p>deseas eliminar esta nota?</p>
        </div>
        <div className="modal-card-actions">
          <button disabled={loading} onClick={handleDeleteNote}>
            {loading ? "Cargando..." : "Eliminar Nota"}
          </button>
          <button
            disabled={loading}
            onClick={() => toggleModalDeleteNote({ showAlert: false, noteId: "" })}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
