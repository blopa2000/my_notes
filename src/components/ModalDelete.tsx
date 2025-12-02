import { useNotes } from "@/context/notes/NotesContext";
import "@/styles/modalDelete.css";
import { noteService } from "@/services/noteService";
import { useAuth } from "@/context/auth/AuthContext";
import { useState } from "react";
import type { TypeModalDeleteData } from "@/utils/types";
import { INITIAL_MODAL } from "@/utils/constants";
import Modal from "./Modal";

type TypeModalDelete = {
  toggleshowModalDelete: (value: TypeModalDeleteData) => void;
  noteId: string;
};

function ModalDelete({ toggleshowModalDelete, noteId }: TypeModalDelete) {
  const { deleteNote } = useNotes();
  const { user } = useAuth();
  const [loading, setloading] = useState(false);

  const handleDeleteNote = async () => {
    if (user?.uid) {
      setloading(true);
      await noteService.deleteNote(user?.uid, noteId);
      deleteNote(noteId);
      setloading(false);
      toggleshowModalDelete(INITIAL_MODAL);
    }
  };

  return (
    <Modal toggleshowModalDelete={() => toggleshowModalDelete(INITIAL_MODAL)}>
      <div className="modal-card-info">
        <h1 className="title ">Eliminar Nota</h1>
        <p className="txt">deseas eliminar esta nota?</p>
      </div>

      <div className="modal-actions">
        <button disabled={loading} className="btn" onClick={handleDeleteNote}>
          {loading ? "Cargando..." : "Eliminar Nota"}
        </button>
        <button
          disabled={loading}
          className="btn"
          onClick={() => toggleshowModalDelete(INITIAL_MODAL)}
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
}

export default ModalDelete;
