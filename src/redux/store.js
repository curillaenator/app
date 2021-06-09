import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { init } from "./reducers/init";
import { main } from "./reducers/main";
import { chat } from "./reducers/chat";

const rootReducer = combineReducers({ init, main, chat });

export const store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store;
