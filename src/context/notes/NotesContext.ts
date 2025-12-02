import { createContext, useContext } from "react";
import { INITIAL_STATE_NOTES } from "@/utils/constants";

export const NotesContext = createContext(INITIAL_STATE_NOTES);

//HOOK
export const useNotes = () => useContext(NotesContext);
