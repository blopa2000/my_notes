import NotNotesImage from "@/assets/undraw_notes_dyq8.svg";
import "@/styles/notnotes.css";
const NotNotes = () => {
  return (
    <div className="not-notes-container">
      <img className="not-notes-img" src={NotNotesImage} alt="not notes" />
      <p className="not-notes-text">No tienes notas, agrega una</p>
    </div>
  );
};

export default NotNotes;
