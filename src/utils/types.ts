import type { ReactNode } from "react";

// Tipos de estado
export interface User {
  name?: string;
  email?: string;
  uid?: string;
}

export interface StateUser {
  user: User | null;
  loading: boolean;
}

export interface WithChildren {
  children: ReactNode;
}

export type AuthContextType = StateUser & {
  setLoading: (value: boolean) => void;
  cleadState: () => void;
  updateUser: (payload: { name: string }) => void;
};

// Tipos de acciones
export type Action =
  | { type: "ADD_USER"; payload: User }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "REMOVE_USER" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "CLEAN_STATE" }
  | { type: "UPDATE_PINNED_NOTE" };

export type Note = {
  noteId: string;
  title: string;
  content: string;
  lastUpdate: string;
  creationDate: string;
  bgColor: string;
  pinned?: boolean;
};

export type TypeModalDeleteData = {
  showModal: boolean;
  modalNoteId: string;
};

export interface StateNotes {
  notes: Note[];
}

export type NotesContextType = StateNotes & {
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  setNotes: () => void;
  getNoteById: (id: string) => Note | undefined;
  updateColorNote: (noteId: string, bgColor: string) => void;
  updatePinnedNote:(noteId: string, pinned: boolean) => void;
};

export type TiptapEditorProps = {
  value?: string;
  onChange?: (html: string) => void;
};
