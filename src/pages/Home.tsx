import MasonryGrid from "@/components/MasonryGrid";
import { useNotes } from "@/context/notes/NotesContext";

export const Home = () => {
  const notes = useNotes()?.notes ?? [];

  return (
    <div>
      <div className="actions-container">
        <div className="actions-container-search">
          <input type="text" />
        </div>
        <div className="actions-container-add-note">
          <button>Add Note</button>
        </div>
      </div>
      <MasonryGrid notes={notes} />
    </div>
  );
};
