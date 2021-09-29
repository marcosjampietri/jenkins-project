import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export interface product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}
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

export interface getProdAction {
  obj: { type: "GET_PROD"; payload: product[] };
}

export interface isLodingAction {
  type: "LOADING";
}

export type allActions = getProdAction | isLodingAction;

export type getProdActionCreator<allActions extends Action> = () => ThunkAction<
  void,
  storeType,
  {},
  allActions
>;
