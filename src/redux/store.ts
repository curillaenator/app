import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";

import { init } from "./reducers/init";
import { main } from "./reducers/main";
import { chat } from "./reducers/chat";

export const store = configureStore({
    reducer: { init, main, chat }, 
    middleware: [thunk],
});

export type TypeState = ReturnType<typeof store.getState>
export type TypeDispatch = typeof store.dispatch

// window.store = store;
