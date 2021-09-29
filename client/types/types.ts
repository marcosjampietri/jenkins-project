import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export interface navType {
  NavOn: boolean;
}

export interface loadType {
  isLoading: boolean;
}

export type Loading = boolean;
export type Error = { name?: string; message?: string } | null;
export interface Product {
  _id: string;
  title: string;
  photoUrl: string;
  price: number;
  rating: number;
  quantity: number;
  maxQuantity: number;
  createdAt: any;
  brand: string;
  ram: string;
  internalStorage: string;
}

export interface ProductState {
  readonly loading: Loading;
  readonly data: Product;
  readonly error: Error;
}

export interface storeType {
  navType: navType;
  loadType: loadType;
  ProductState: ProductState;
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
