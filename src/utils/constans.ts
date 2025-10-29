import type { AuthContextType, NotesContextType, TypeModalDeleteData } from "./types";

export const INITIAL_STATE_AUTH: AuthContextType = {
  user: null,
  loading: true,
  setLoading: () => {},
  cleadState: () => {},
};

export const INITIAL_STATE_NOTES: NotesContextType = {
  notes: [],
  addNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
  setNotes: () => {},
  getNoteById: () => undefined,
};

export const INITIAL_MODAL: TypeModalDeleteData = {
  showModal: false,
  modalNoteId: "",
};

export const COLORS_HIGHLIGHT = ["#fdef70ff", "#bcff6fff", "#75d3ffff", "#ffb6ceff", "#f8b95bff"];
