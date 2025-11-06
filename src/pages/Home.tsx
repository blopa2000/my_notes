import MasonryGrid from "@/components/MasonryGrid";
import ModalDelete from "@/components/ModalDelete";
import NotFound from "@/components/NotFound";
import NotNotes from "@/components/NotNotes";
import { useNotes } from "@/context/notes/NotesContext";
import "@/styles/home.css";
import { INITIAL_MODAL } from "@/utils/constans";
import type { TypeModalDeleteData } from "@/utils/types";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export const Home = () => {
  const { notes } = useNotes() ?? [];
  const [search, setSearch] = useState(notes);
  const [modalData, setModalData] = useState(INITIAL_MODAL);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(
      notes.filter((note) => {
        return note.title.toLowerCase().includes(e.target.value.toLowerCase());
      })
    );
  };

  const toggleshowModalDelete = (value: TypeModalDeleteData) => {
    setModalData({
      showModal: value.showModal,
      modalNoteId: value.modalNoteId,
    });
  };

  useEffect(() => {
    setSearch(notes);
  }, [notes]);

  return (
    <div>
      {modalData.showModal && (
        <ModalDelete toggleshowModalDelete={toggleshowModalDelete} noteId={modalData.modalNoteId} />
      )}

      <div className="actions-container">
        <div className="actions-container-search">
          <input
            onChange={handleSearch}
            name="search"
            className="FRM-input"
            type="text"
            placeholder="Titulo de nota..."
          />
        </div>
        <div className="actions-container-add-note">
          <Link to="/dashboard/add-Note">Nueva Nota</Link>
        </div>
      </div>
      {search.length === 0 && notes.length > 0 && <NotFound />}
      {notes.length === 0 && <NotNotes />}
      <MasonryGrid notes={search} toggleshowModalDelete={toggleshowModalDelete} />
    </div>
  );
};
