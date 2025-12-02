import type { AuthContextType, NotesContextType, TypeModalDeleteData } from "./types";

export const INITIAL_STATE_AUTH: AuthContextType = {
  user: null,
  loading: true,
  setLoading: () => { },
  cleanState: () => { },
  updateUser: () => { },
};

export const INITIAL_STATE_NOTES: NotesContextType = {
  notes: [],
  addNote: () => { },
  updateNote: () => { },
  deleteNote: () => { },
  setNotes: () => { },
  getNoteById: () => undefined,
  updateColorNote: () => { },
  updatePinnedNote: () => { },
};

export const INITIAL_MODAL: TypeModalDeleteData = {
  showModal: false,
  modalNoteId: "",
};

export const COLORS_HIGHLIGHT = ["#fdef70ff", "#bcff6fff", "#75d3ffff", "#ffb6ceff", "#f8b95bff"];

export const BACKGROUND_COLORS = ["#cc88c4", "#ffe9e9", "#a088cc", "#c7f0ff", "#B9FFBF", "#fbffc1"];
