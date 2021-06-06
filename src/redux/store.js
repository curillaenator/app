import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { init } from "./reducers/init";
import { main } from "./reducers/main";

const rootReducer = combineReducers({ init, main });

export const store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store;
