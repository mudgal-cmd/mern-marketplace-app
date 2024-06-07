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
      state.loading = true;
    },
    signInSuccess: (state, action) => { //action would be the data received from the db. Do something with it.
      state.currenUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;

export default userSlice.reducer;