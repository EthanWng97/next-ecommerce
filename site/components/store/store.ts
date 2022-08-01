import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

import cartSlice from "./cart/slice";

const combinedReducer = combineReducers({
  cart: cartSlice,
});

export type RootState = ReturnType<typeof combinedReducer>;

const store = configureStore({
  reducer: combinedReducer,
  middleware: [createStateSyncMiddleware()],
});

export const makeStore = () => store;

initMessageListener(store);

export const wrapper = createWrapper(makeStore);
