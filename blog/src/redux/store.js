import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import allReducers from "./index";

const initialState = {};

const middleware = [thunk];

const enhancer =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  allReducers,
  initialState,
  compose(applyMiddleware(...middleware), enhancer)
);

export default store;
