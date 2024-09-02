import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js"
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {persistStore} from "redux-persist";
import listingReducer from "./listing/listingSlice.js";

const rootReducer = combineReducers({user: userReducer, listing: listingReducer}); //integrated the listing and user reducers to the global state.

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