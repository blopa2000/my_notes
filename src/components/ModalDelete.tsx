import { useNotes } from "@/context/notes/NotesContext";
import "@/styles/modalDelete.css";
import { noteService } from "@/services/noteService";
import { useAuth } from "@/context/auth/AuthContext";
import { useEffect, useRef, useState } from "react";
import type { TypeModalDeleteData } from "@/utils/types";
import { INITIAL_MODAL } from "@/utils/constans";

type TypeModalDelete = {
  toggleshowModalDelete: (value: TypeModalDeleteData) => void;
  noteId: string;
};

function ModalDelete({ toggleshowModalDelete, noteId }: TypeModalDelete) {
  const { deleteNote } = useNotes();
  const { user } = useAuth();
  const [loading, setloading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleDeleteNote = async () => {
    if (user?.uid) {
      setloading(true);
      await noteService.deleteNote(user?.uid, noteId);
      deleteNote(noteId);
      setloading(false);
      toggleshowModalDelete(INITIAL_MODAL);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        toggleshowModalDelete(INITIAL_MODAL);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [toggleshowModalDelete]);

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
          <button disabled={loading} onClick={() => toggleshowModalDelete(INITIAL_MODAL)}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
