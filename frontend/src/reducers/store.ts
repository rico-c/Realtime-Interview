import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import accoutReducer from "./accout";
import editorReducer from './editor';

const reducers = {
  accout: accoutReducer,
  editor: editorReducer
};

const initalState:any = {};

const store = createStore(
  combineReducers(reducers),
  initalState,
  compose(
    applyMiddleware(thunkMiddleware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
