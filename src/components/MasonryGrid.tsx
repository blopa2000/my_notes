import Masonry from "react-masonry-css";
import Card from "./Card";
import type { Note } from "../utils/types";
import "../styles/masonry.css";

const MasonryGrid = ({ notes }: { notes: Note[] }) => {
  const breakpointColumnsObj = {
    default: 8,
    2650: 8,
    2325: 6,
    2050: 5,
    1770: 4,
    1350: 3,
    1190: 2,
    900: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {notes.map((note) => (
        <Card key={note.noteId} note={note} />
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
