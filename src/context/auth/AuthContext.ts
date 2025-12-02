import { createContext, useContext } from "react";
import { INITIAL_STATE_AUTH } from "@/utils/constants";

export const AuthContext = createContext(INITIAL_STATE_AUTH);

//HOOK
export const useAuth = () => useContext(AuthContext);
