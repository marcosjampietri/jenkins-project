import { actionCreator } from "../../types/types";

export const loadAction: actionCreator<any> =
  () => async (dispatch, getState) => {
    dispatch({
      type: "LOADED",
    });
  };
