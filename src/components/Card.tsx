import { Palette, Trash } from "lucide-react";
import "../styles/card.css";
import type { Note } from "../utils/types";
import { useNavigate } from "react-router";

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
  const { title, content, lastUpdate, bgColor, noteId } = note;
  const navigate = useNavigate();
  const textColor = getTextColor(bgColor);

  const handleCardClick = (id: string) => {
    console.log("Card clicked:", id);
    navigate(`/dashboard/edit`, { state: { noteId: id } });
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
        <button className="card-btn">
          <Palette />
        </button>
        <button className="card-btn delete">
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default Card;
