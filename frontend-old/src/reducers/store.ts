import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import accoutReducer from "./accout";
import editorReducer from "./editor";
import interviewReducer from "./interview";
import teamRuducer from "./team";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = {
  accout: accoutReducer,
  editor: editorReducer,
  interview: interviewReducer,
  currentteam: teamRuducer,
};

const persistConfig = {
  key: "root",
  storage: storage,
};

const myPersistReducer = persistReducer(
  persistConfig,
  combineReducers(reducers)
);

const initalState = {};
const devtool = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
const devMiddle = !!devtool
  ? compose(applyMiddleware(thunkMiddleware), devtool())
  : applyMiddleware(thunkMiddleware);

const store = createStore(myPersistReducer, initalState, devMiddle);

export const persistor = persistStore(store);
export default store;
