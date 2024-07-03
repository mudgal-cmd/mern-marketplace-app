import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice.js"
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {persistStore} from "redux-persist";

const rootReducer = combineReducers({user: userReducer});

const persistConfig = {
  key : "root", 
  storage: storage,
  version:1
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer:{user : userReducer},
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }), //to ensure we don't get the error
});

export const persistor = persistStore(store);