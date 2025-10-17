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

// Tipos de acciones
export type Action =
  | { type: "ADD_USER"; payload: User }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "REMOVE_USER" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "CLEAN_STATE" };
