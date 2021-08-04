import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export interface navType {
  NavOn: boolean;
}

export interface loadType {
  isLoading: boolean;
}

export interface storeType {
  navType: navType;
  loadType: loadType;
}

export interface navActionTP {
  obj: { type: "TOGGLE_NAV" };
}

export interface isLodingActionTP {
  type: "LOADED";
}

export type allActions = navActionTP | isLodingActionTP;

export type actionCreator<allActions extends Action> = () => ThunkAction<
  void,
  storeType,
  {},
  allActions
>;
