import MasonryGrid from "@/components/MasonryGrid";
import { useNotes } from "@/context/notes/NotesContext";
import "@/styles/home.css";
import { Link } from "react-router";

export const Home = () => {
  const notes = useNotes()?.notes ?? [];

  return (
    <div>
      <div className="actions-container">
        <div className="actions-container-search">
          <input type="text" placeholder="Titulo de nota..." />
        </div>
        <div className="actions-container-add-note">
          <Link to="/dashboard/add-Note">Add Note</Link>
        </div>
      </div>
      <MasonryGrid notes={notes} />
    </div>
  );
};
