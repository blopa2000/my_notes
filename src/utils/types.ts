import type { ReactNode } from "react";

// Tipos de estado
export interface User {
  name?: string;
  email?: string;
  uid?: string;
}

export interface State {
  user: User | null;
  loading: boolean;
}

export type AuthContextType = State & {
  setLoading: (value: boolean) => void;
};

// Tipos de acciones
export type Action =
  | { type: "ADD_USER"; payload: User }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "REMOVE_USER" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "CLEAN_STATE" };

export interface WithChildren {
  children: ReactNode;
}
