import { Product } from "../../types/prodTypes";

import {
  ADD_TO_CART,
  AddToCartAction,
  REMOVE_FROM_CART,
  RemoveFromCartAction,
  CLEAR_CART,
  ClearCartAction,
  ADD_QTY_ITEM,
  AddQtyItemAction,
  MINUS_QTY_ITEM,
  MinusQtyItemAction,
} from "../../types/cartTypes";

export const addToBasket = (product: Product): AddToCartAction => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromBasket = (_id: string): RemoveFromCartAction => ({
  type: REMOVE_FROM_CART,
  payload: _id,
});

export const clearCart = (): ClearCartAction => ({
  type: CLEAR_CART,
});

export const addQtyItem = (_id: string): AddQtyItemAction => ({
  type: ADD_QTY_ITEM,
  payload: _id,
});

export const minusQtyItem = (_id: string): MinusQtyItemAction => ({
  type: MINUS_QTY_ITEM,
  payload: _id,
});
