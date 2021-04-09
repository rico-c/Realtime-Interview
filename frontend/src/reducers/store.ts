import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import accoutReducer from "./accout";
import editorReducer from './editor';
import interviewReducer from "./interview";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = {
  accout: accoutReducer,
  editor: editorReducer,
  interview: interviewReducer
};

const persistConfig = {
  key: "root",
  storage: storage
};

const myPersistReducer = persistReducer(persistConfig, combineReducers(reducers));

const initalState:any = {};

const store = createStore(
  myPersistReducer,
  initalState,
  compose(
    applyMiddleware(thunkMiddleware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const persistor = persistStore(store);
export default store;
