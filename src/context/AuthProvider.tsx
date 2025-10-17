import { useEffect, useReducer, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { INITIAL_STATE } from "../utils/constans";
import { Reduceers } from "./Reducers";
import { authService } from "../services/authService";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(Reduceers, INITIAL_STATE);

  // verificacion de usuario
  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });

    const unsubscribe = authService.subscribeToAuthState((user) => {
      if (user) {
        dispatch({ type: "ADD_USER", payload: user });
      } else {
        //  logout();
      }
      dispatch({ type: "SET_LOADING", payload: false });
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
