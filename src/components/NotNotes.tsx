import NotNotesImage from "@/assets/note.png";
import "@/styles/notNotes.css";

const NotNotes = () => {
  return (
    <div className="not-notes-container">
      <p className="not-notes-text">No tienes notas, agrega una</p>
      <img className="not-notes-img" src={NotNotesImage} alt="not notes" />
    </div>
  );
};

export default NotNotes;
