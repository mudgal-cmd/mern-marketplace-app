import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loadingEffect: false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loadingEffect = true;
    },
    signInSuccess: (state, action) => { //action would be the data received from the db. Do something with it.
      state.currentUser = action.payload;
      state.error = null;
      state.loadingEffect = false;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loadingEffect = false;
    },
    signInChange: (state) => {
      state.loadingEffect = false;
      state.error = null;
    },

    updateUserStart: (state) => {
      state.loadingEffect = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loadingEffect = false;
      state.error = false
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loadingEffect = false;
    },

    deleteUserStart: (state)=> {
      state.loadingEffect= true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      loadingEffect = false;
    },

    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loadingEffect = false;
    },

    signOutStart: (state)=> {
      state.loadingEffect = true;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loadingEffect = false;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.error = action.payload;
      state.loadingEffect = false;
    }
  }
});

export const {signInStart, signInSuccess, signInFailure, signInChange, 
  updateUserStart, updateUserSuccess, updateUserFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure,
  signOutStart, signOutSuccess, signOutFailure
} = userSlice.actions;

export default userSlice.reducer;