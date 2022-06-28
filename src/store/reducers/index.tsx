import { combineReducers } from "redux";
import getFormReducer from "./getFormReducer";
import postFormReducer from "./postFormReducer";

export default combineReducers({
  formFieldData: getFormReducer,
  formUserData: postFormReducer,
});
