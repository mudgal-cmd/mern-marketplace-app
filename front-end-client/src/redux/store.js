import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice.js"

export const store = configureStore({
  reducer:{user : userReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }), //to ensure we don't get the error
});