import { INITIAL_STATE_AUTH } from "@/utils/constants";
import type { Action, StateUser } from "@/utils/types";

export const AuthReducer = (state: StateUser = INITIAL_STATE_AUTH, action: Action) => {
  const { type } = action;
  switch (type) {
    case "CLEAN_STATE":
      return INITIAL_STATE_AUTH;
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
