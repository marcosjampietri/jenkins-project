import { actionCreator } from "../../types/types";

export const vidAction: actionCreator<any> =
  () => async (dispatch, getState) => {
    dispatch({
      type: "TOGGLE_MOD_VIDEO",
    });
  };

export const picAction: actionCreator<any> =
  () => async (dispatch, getState) => {
    dispatch({
      type: "TOGGLE_MOD_PIC",
    });
  };

export const modOffAction: actionCreator<any> =
  () => async (dispatch, getState) => {
    dispatch({
      type: "TOGGLE_MOD_OFF",
    });
  };
