import { actionCreator } from "../../types/types";

export const navAction: actionCreator<any> =
  () => async (dispatch, getState) => {
    dispatch({
      type: "TOGGLE_NAV",
    });
  };
