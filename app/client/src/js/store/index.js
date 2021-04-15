// src/js/store/index.js
import {
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import gameSlice from "../features/gameSlice";


const middleware = [
  ...getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
  /*YOUR CUSTOM MIDDLEWARES HERE*/
];

const rootReducer = combineReducers({
    game: gameSlice.reducer,
});

// CREATE STORE
export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;