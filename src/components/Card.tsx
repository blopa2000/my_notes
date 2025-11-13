import { Palette, Trash, Pin, PinOff } from "lucide-react";
import "../styles/card.css";
import type { TypeModalDeleteData, Note } from "../utils/types";
import { useNavigate } from "react-router";
import PopoverColor from "./PopoverColor";
import { useRef, useState } from "react";
import { noteService } from "@/services/noteService";
import { useAuth } from "@/context/auth/AuthContext";
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

type TypeCard = {
  toggleshowModalDelete: (value: TypeModalDeleteData) => void;
  note: Note;
};

const Card = ({ toggleshowModalDelete, note }: TypeCard) => {
  const { title, content, lastUpdate, bgColor, noteId, pinned } = note;
  const navigate = useNavigate();
  const textColor = getTextColor(bgColor);
  const [showColors, setShowColors] = useState(false);
  const { user } = useAuth();
  const { updateColorNote, updatePinnedNote } = useNotes();
  const [loading, setloading] = useState(false);
  const ButtonColorRef = useRef<HTMLButtonElement>(null);

  const handleCardClick = (id: string) => {
    navigate(`/dashboard/edit`, { state: { noteId: id } });
  };

  const handlePinNote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?.uid) return;
    // console.log(note.noteId);

    const newPinnedState = !note.pinned;
    await noteService.changePinned(user.uid, note.noteId, newPinnedState);
    updatePinnedNote(note.noteId, newPinnedState);
  };

  const handleColor = (e: React.FormEvent) => {
    e.stopPropagation();
    setShowColors((prev) => !prev);
  };

  const handleDeleteNote = (e: React.FormEvent) => {
    e.stopPropagation();
    toggleshowModalDelete({ showModal: true, modalNoteId: noteId });
  };

  const handleChangeColor = async (color: string | undefined = "#ffffff") => {
    if (user?.uid) {
      if (color !== bgColor) {
        setloading(true);
        await noteService.changeColor(user?.uid, noteId, color);
        updateColorNote(noteId, color);
        setloading(false);
      }
    }
  };

  return (
    <div className="card-container">
      <div
        onClick={() => handleCardClick(noteId)}
        style={{ background: bgColor, color: textColor, zIndex: 2 }}
        className={`card ${pinned ? "card-pinned" : ""}`}
      >
        <div className="card-info-Container">
          <div className="card-info-header">
            <button
              className={`card-btn  ${pinned ? "pinned" : "over-pinned"}`}
              onClick={handlePinNote}
            >
              {pinned ? <PinOff /> : <Pin />}
            </button>
            <span className="card-date">{lastUpdate}</span>
          </div>
          <h2>{title}</h2>
          <div className="card-info-content" dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <div className="card-action-Container">
          <button ref={ButtonColorRef} className="card-btn" onClick={handleColor}>
            <Palette />
          </button>
          <button className="card-btn delete" onClick={handleDeleteNote}>
            <Trash />
          </button>
        </div>
      </div>
      <PopoverColor
        ButtonColorRef={ButtonColorRef}
        loading={loading}
        showColors={showColors}
        colorNote={bgColor}
        closeColor={() => setShowColors(false)}
        handleChangeColor={handleChangeColor}
      />
    </div>
  );
};

export default Card;
