import { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { Reduceers } from "./Reducers";
import { authService } from "../services/authService";
import { INITIAL_STATE } from "../utils/constans";
import type { WithChildren } from "../utils/types";

export function AuthProvider({ children }: WithChildren) {
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

  const setLoading = (value: boolean) => {
    dispatch({ type: "SET_LOADING", payload: value });
  };

  return <AuthContext.Provider value={{ ...state, setLoading }}>{children}</AuthContext.Provider>;
}
