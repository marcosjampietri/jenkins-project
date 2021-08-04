import { loadType } from "../../types/types";

const initState = {
  isLoading: true,
};

export const loadReducer = (state: loadType = initState, action: any) => {
  switch (action.type) {
    case "LOADED":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
