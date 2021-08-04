import { combineReducers } from "redux";
import { navReducer } from "./navReducer";
// import { modReducer } from "./modReducer";
import { loadReducer } from "./loadReducer";

const rootReducer = combineReducers({
  nav: navReducer,
  // mod: modReducer,
  load: loadReducer,
});

export default rootReducer;
