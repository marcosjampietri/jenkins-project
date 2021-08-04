/*
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
*/

export interface product {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
}

export interface storeType {
    products: product[];
    isLoading: boolean;
}

export interface getProdAction {
    obj: { type: "GET_PROD"; payload: product[] };
}

export interface isLodingAction {
    type: "LOADING";
}

export type allActions = getProdAction | isLodingAction;

/*
export type getProdActionCreator<allActions extends Action> = () => ThunkAction<
      void,
      storeType,
      {},
      allActions
>;
*/
