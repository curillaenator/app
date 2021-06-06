import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { init } from "./reducers/init";

const rootReducer = combineReducers({ init });

export const store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store;
