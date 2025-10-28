import { Palette, Trash } from "lucide-react";
import "../styles/card.css";
import type { Note } from "../utils/types";
import { useNavigate } from "react-router";
import { useNotes } from "@/context/notes/NotesContext";

const getTextColor = (bgColor: string) => {
  if (!bgColor) return "#222";
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#222" : "#fff";
};

const Card = ({ note }: { note: Note }) => {
  const { toggleModalDeleteNote } = useNotes();
  const { title, content, lastUpdate, bgColor, noteId } = note;
  const navigate = useNavigate();
  const textColor = getTextColor(bgColor);

  const handleCardClick = (id: string) => {
    navigate(`/dashboard/edit`, { state: { noteId: id } });
  };

  const handleColor = (e: React.FormEvent) => {
    e.stopPropagation();
    console.log("color");
  };

  const handleDeleteNote = (e: React.FormEvent) => {
    e.stopPropagation();
    toggleModalDeleteNote({ showAlert: true, noteId });
  };

  return (
    <div
      onClick={() => handleCardClick(noteId)}
      style={{ background: bgColor, color: textColor }}
      className="card-container"
    >
      <div className="card-info-Container">
        <span className="card-date">{lastUpdate}</span>
        <h2>{title}</h2>
        <div className="card-info-content" dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <div className="card-action-Container">
        <button className="card-btn" onClick={handleColor}>
          <Palette />
        </button>
        <button className="card-btn delete" onClick={handleDeleteNote}>
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default Card;
