import { useEffect, useReducer, useMemo, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { AuthReducer } from "./AuthReducer";
import { authService } from "@/services/authService";
import { INITIAL_STATE_AUTH } from "@/utils/constants";
import type { WithChildren } from "@/utils/types";

export function AuthProvider({ children }: WithChildren) {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE_AUTH);

  // verificacion de usuario
  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });

    const unsubscribe = authService.subscribeToAuthState((user) => {
      if (user) {
        dispatch({ type: "ADD_USER", payload: user });
      } else {
        cleanState();
      }
    });

    const timer = setTimeout(() => dispatch({ type: "SET_LOADING", payload: false }), 2000);
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const setLoading = useCallback((value: boolean) => {
    dispatch({ type: "SET_LOADING", payload: value });
  }, []);

  const cleanState = useCallback(() => {
    dispatch({ type: "CLEAN_STATE" });
  }, []);

  const updateUser = useCallback((payload: { name: string }) => {
    dispatch({ type: "UPDATE_USER", payload });
  }, []);

  const value = useMemo(
    () => ({ ...state, setLoading, cleanState, updateUser }),
    [state, setLoading, cleanState, updateUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
