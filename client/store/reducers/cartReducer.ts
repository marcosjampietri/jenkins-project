import {
  CartState,
  CartActionType,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  ADD_QTY_ITEM,
  MINUS_QTY_ITEM,
} from "../../types/cartTypes";

const initialState: CartState = [];

export const cartReducer = (
  state: CartState = initialState,
  { type, payload }: CartActionType
): CartState => {
  switch (type) {
    case ADD_TO_CART:
      return state.some((product) => product._id === payload._id)
        ? state.map((product) => {
            if (product._id === payload._id) {
              return {
                ...product,
                quantity: product.quantity + 1,
              };
            }
            return product;
          })
        : [...state, { ...payload, quantity: 1 }];

    case REMOVE_FROM_CART:
      return state.filter((product) => product._id !== payload);

    case CLEAR_CART:
      return initialState;

    case ADD_QTY_ITEM:
      return state.map((product) => {
        if (product._id === payload) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });

    case MINUS_QTY_ITEM:
      return state.map((product) => {
        if (product.quantity > 0) {
          if (product._id === payload) {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          }
        } else {
          state.filter((product) => product._id !== payload);
        }
        return product;
      });
    default:
      return state;
  }
};
