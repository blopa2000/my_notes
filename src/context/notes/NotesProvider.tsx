import { useReducer, useEffect } from "react";
import { NotesContext } from "./NotesContext";
import { NotesReducer } from "./NotesReducer";
import { noteService } from "@/services/noteService";
import { useAuth } from "../auth/AuthContext";
import type { Note, WithChildren } from "@/utils/types";
import { INITIAL_STATE_NOTES } from "@/utils/constans";

export const NotesProvider = ({ children }: WithChildren) => {
  const [state, dispatch] = useReducer(NotesReducer, INITIAL_STATE_NOTES);
  const { user, setLoading } = useAuth();

  useEffect(() => {
    if (!user?.uid || state.notes.length > 0) return;
    setLoading(true);
    noteService
      .getNotes(user.uid)
      .then((res) => {
        dispatch({ type: "SET_NOTES", payload: res });
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const addNote = (note: Note) => dispatch({ type: "ADD_NOTE", payload: note });
  const updateNote = (note: Note) => dispatch({ type: "UPDATE_NOTE", payload: note });
  const deleteNote = (id: string) => dispatch({ type: "DELETE_NOTE", payload: id });

  const setNotes = () => {
    dispatch({ type: "SET_NOTES", payload: [] });
  };

  const getNoteById = (id: string): Note | undefined => {
    const note = state.notes.find((n: Note) => n.noteId === id);
    return note;
  };

  const updateColorNote = (noteId: string, bgColor: string) => {
    dispatch({ type: "UPDATE_COLOR_NOTE", payload: { noteId, bgColor } });
  };

  return (
    <NotesContext.Provider
      value={{
        ...state,
        addNote,
        updateNote,
        deleteNote,
        setNotes,
        getNoteById,
        updateColorNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
