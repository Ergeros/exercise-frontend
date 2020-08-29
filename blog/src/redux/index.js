import { combineReducers } from "redux";

import userReducer from "redux/user/reducer";
import articleReducer from "redux/article/reducer";
export default combineReducers({
  user: userReducer,
  articles: articleReducer,
});
