import MasonryGrid from "@/components/MasonryGrid";
import ModalDelete from "@/components/ModalDelete";
import { useNotes } from "@/context/notes/NotesContext";
import "@/styles/home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export const Home = () => {
  const { notes, handleDelete } = useNotes() ?? [];
  const [search, setSearch] = useState(notes);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(
      notes.filter((note) => {
        return note.title.toLowerCase().includes(e.target.value.toLowerCase());
      })
    );
  };

  useEffect(() => {
    setSearch(notes);
  }, [notes]);

  return (
    <div>
      {handleDelete.showAlert && <ModalDelete />}

      <div className="actions-container">
        <div className="actions-container-search">
          <input
            onChange={handleSearch}
            name="search"
            type="text"
            placeholder="Titulo de nota..."
          />
        </div>
        <div className="actions-container-add-note">
          <Link to="/dashboard/add-Note">Add Note</Link>
        </div>
      </div>
      {search.length === 0 && notes.length > 0 && <div>No veo lo que buscas</div>}
      {notes.length === 0 && <div>No tienes notas, agrega una</div>}
      <MasonryGrid notes={search} />
    </div>
  );
};
