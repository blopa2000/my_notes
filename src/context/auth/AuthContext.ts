import { createContext, useContext } from "react";
import { INITIAL_STATE } from "../../utils/constans";

export const AuthContext = createContext(INITIAL_STATE);

//HOOK
export const useAuth = () => useContext(AuthContext);
