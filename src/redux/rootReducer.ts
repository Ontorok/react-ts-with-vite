import { combineReducers } from "redux";
import counterSlice from "./counter/counterSlice";

const rootReducer = combineReducers({
  counter: counterSlice,
});

export default rootReducer;
