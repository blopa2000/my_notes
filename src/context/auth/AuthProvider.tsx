import { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { AuthReduceer } from "./AuthReduceer";
import { authService } from "@/services/authService";
import { INITIAL_STATE_AUTH } from "@/utils/constans";
import type { WithChildren } from "@/utils/types";

export function AuthProvider({ children }: WithChildren) {
  const [state, dispatch] = useReducer(AuthReduceer, INITIAL_STATE_AUTH);

  // verificacion de usuario
  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });

    const unsubscribe = authService.subscribeToAuthState((user) => {
      if (user) {
        dispatch({ type: "ADD_USER", payload: user });
      } else {
        cleadState();
      }
    });

    const timer = setTimeout(() => dispatch({ type: "SET_LOADING", payload: false }), 2000);
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const setLoading = (value: boolean) => {
    dispatch({ type: "SET_LOADING", payload: value });
  };

  const cleadState = () => {
    dispatch({ type: "CLEAN_STATE" });
  };

  return (
    <AuthContext.Provider value={{ ...state, setLoading, cleadState }}>
      {children}
    </AuthContext.Provider>
  );
}
