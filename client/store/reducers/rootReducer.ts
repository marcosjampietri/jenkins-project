import { combineReducers } from "redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import { navReducer } from "./navReducer";
// import { modReducer } from "./modReducer";
import { loadReducer } from "./loadReducer";
import { cartReducer } from "./cartReducer";
import { filterByReducer } from "./filterReducer";
import { productReducer } from "./prodReducer";
import { productsReducer } from "./prodsReducer";

const rootReducer = combineReducers({
  nav: navReducer,
  // mod: modReducer,
  load: loadReducer,
  cart: cartReducer,
  filterBy: filterByReducer,
  product: productReducer,
  catalog: productsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export default rootReducer;
