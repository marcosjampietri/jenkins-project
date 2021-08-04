import { navType } from "../../types/types";

const initState = {
  NavOn: false,
};

export const navReducer = (state: navType = initState, action: any) => {
  switch (action.type) {
    case "TOGGLE_NAV":
      return {
        ...state,
        NavOn: !state.NavOn,
      };
    default:
      return {
        ...state,
      };
  }
};
