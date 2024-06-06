import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer:{},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }), //to ensure we don't get the error
});