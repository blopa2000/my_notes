import Masonry from "react-masonry-css";
import Card from "./Card";
import type { TypeModalDeleteData, Note } from "../utils/types";
import "../styles/masonry.css";

type TypeMasonryGrid = {
  toggleshowModalDelete: (value: TypeModalDeleteData) => void;
  notes: Note[];
};

const MasonryGrid = ({ toggleshowModalDelete, notes }: TypeMasonryGrid) => {
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
        <Card key={note.noteId} note={note} toggleshowModalDelete={toggleshowModalDelete} />
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
