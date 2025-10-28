import type { handleDelete, Note, StateNotes } from "../../utils/types";
import { INITIAL_STATE_NOTES } from "../../utils/constans";

export type NotesAction =
  | { type: "SET_NOTES"; payload: Note[] }
  | { type: "ADD_NOTE"; payload: Note }
  | { type: "UPDATE_NOTE"; payload: Note }
  | { type: "DELETE_NOTE"; payload: string }
  | { type: "SET_SHOW_MODAL_DELETE"; payload: handleDelete };

export const NotesReducer = (
  state: StateNotes = INITIAL_STATE_NOTES,
  action: NotesAction
): StateNotes => {
  switch (action.type) {
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "ADD_NOTE":
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case "UPDATE_NOTE": {
      const updatedNotes = state.notes.filter((n: Note) => n.noteId !== action.payload.noteId);
      return {
        ...state,
        notes: [action.payload, ...updatedNotes],
      };
    }
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((n: Note) => n.noteId !== action.payload),
      };
    case "SET_SHOW_MODAL_DELETE":
      return {
        ...state,

        handleDelete: action.payload,
      };
    default:
      return state;
  }
};
