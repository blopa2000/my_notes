import type { AuthContextType } from "./types";

export const INITIAL_STATE: AuthContextType = {
  user: null,
  loading: false,
  setLoading: () => {},
};
