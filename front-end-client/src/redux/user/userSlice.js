import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currenUser: null,
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
      state.currenUser = action.payload;
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
    }
  }
});

export const {signInStart, signInSuccess, signInFailure, signInChange} = userSlice.actions;

export default userSlice.reducer;