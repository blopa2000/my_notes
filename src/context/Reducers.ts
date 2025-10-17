import { INITIAL_STATE } from "../utils/constans";
import type { Action, State } from "../utils/types";

export const Reduceers = (state: State = INITIAL_STATE, action: Action) => {
  const { type } = action;
  switch (type) {
    case "CLEAN_STATE":
      return INITIAL_STATE;
    /**
     * USER
     */
    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: null,
        loading: false,
      };
    /**
     * LOADING
     */
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
